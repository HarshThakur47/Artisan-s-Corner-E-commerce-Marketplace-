import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct, updateProduct, reset } from '../store/slices/productSlice';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext'; // 1. Import Theme Context

const ProductEditPage = () => {
  const { id: productId } = useParams();
  const { colors } = useTheme(); // 2. Get Colors
  
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { product, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.product
  );
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && product && product._id === productId) {
        // If update was successful (and we are not just loading the page for the first time)
        // Note: You might need a more robust check here depending on your slice logic
        // For now, we rely on the submit handler's result check.
    } 
    
    if (!product || product._id !== productId) {
        dispatch(getProduct(productId));
    } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
    }
  }, [dispatch, productId, product, isSuccess]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Ensure this URL matches your backend configuration
      const { data } = await axios.post('http://localhost:5000/api/upload', formData, config);

      setImage(data.url);
      setUploading(false);
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error(error);
      setUploading(false);
      toast.error('Image upload failed');
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await dispatch(
      updateProduct({
        id: productId,
        productData: {
          name,
          price,
          image,
          category,
          description,
          countInStock,
        },
      })
    );
    
    if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Product Updated');
        navigate('/admin');
        dispatch(reset()); 
    }
  };

  // Common Styles
  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '10px',
    border: `2px solid ${colors.border}`,
    background: colors.surface,
    color: colors.text,
    fontSize: '15px',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.875rem',
    fontWeight: '600',
    color: colors.textSecondary
  };

  const handleFocus = (e) => e.target.style.borderColor = colors.primary;
  const handleBlur = (e) => e.target.style.borderColor = colors.border;

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      paddingTop: '100px',
      paddingBottom: '80px'
    }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <Link 
          to="/admin" 
          style={{
            display: 'inline-flex', alignItems: 'center', marginBottom: '1.5rem',
            color: colors.textSecondary, textDecoration: 'none', fontWeight: '500',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = colors.primary}
          onMouseLeave={(e) => e.target.style.color = colors.textSecondary}
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        {/* Glass Card */}
        <div style={{
          background: colors.surface,
          borderRadius: '24px',
          padding: '2.5rem',
          boxShadow: `0 8px 32px ${colors.shadow}`,
          border: `1px solid ${colors.border}`
        }}>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', color: colors.text, marginBottom: '2rem' }}>
            Edit Product
          </h1>
          
          {isLoading && <div style={{color: colors.text}}>Loading...</div>}
          {isError && <div style={{color: colors.error, marginBottom: '1rem'}}>{message}</div>}

          <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {/* Name */}
            <div>
              <label style={labelStyle}>Product Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Price & Stock Row */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <label style={labelStyle}>Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
              <div>
                <label style={labelStyle}>Count In Stock</label>
                <input
                  type="number"
                  placeholder="Enter stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>
            </div>

            {/* Category */}
            <div>
              <label style={labelStyle}>Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={inputStyle}
                onFocus={handleFocus}
                onBlur={handleBlur}
              />
            </div>

            {/* Image */}
            <div>
              <label style={labelStyle}>Image URL</label>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'stretch' }}>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    style={{ ...inputStyle, flex: 1 }}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                  
                  <div style={{ position: 'relative' }}>
                    <input
                        type="file"
                        id="image-file"
                        onChange={uploadFileHandler}
                        style={{ display: 'none' }}
                    />
                    <label 
                        htmlFor="image-file"
                        style={{
                          height: '100%',
                          display: 'flex', alignItems: 'center', padding: '0 1.5rem',
                          background: colors.surfaceLight,
                          border: `2px solid ${colors.border}`,
                          borderRadius: '10px', cursor: 'pointer',
                          color: colors.text, fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = colors.primary;
                          e.currentTarget.style.color = colors.primary;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = colors.border;
                          e.currentTarget.style.color = colors.text;
                        }}
                    >
                        {uploading ? '...' : <><FaUpload className="mr-2"/> Upload</>}
                    </label>
                  </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <label style={labelStyle}>Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                style={{ ...inputStyle, resize: 'vertical' }}
                onFocus={handleFocus}
                onBlur={handleBlur}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '16px',
                marginTop: '1rem',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 8px 20px ${colors.shadow}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadow}`;
              }}
            >
              <FaSave /> Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;