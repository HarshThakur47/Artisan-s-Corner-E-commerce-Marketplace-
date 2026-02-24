import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct, updateProduct, reset } from '../store/slices/productSlice';
import { FaArrowLeft, FaUpload, FaSave } from 'react-icons/fa';
import { BASE_URL } from '../utils/config';

const ProductEditPage = () => {
  const { id: productId } = useParams();
  
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
        // Success logic handled in submit
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

      const { data } = await axios.post(`${BASE_URL}/upload`, formData, config);

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

  return (
    <div className="page-wrapper">
      <div className="container" style={{ maxWidth: '800px' }}>
        
        {/* Back Button */}
        <Link 
          to="/admin" 
          style={{
            display: 'inline-flex', alignItems: 'center', marginBottom: '1.5rem',
            color: 'var(--text-secondary)', textDecoration: 'none', fontWeight: '500',
            transition: 'color 0.2s'
          }}
        >
          <FaArrowLeft className="mr-2" /> Back to Dashboard
        </Link>

        {/* Glass Card */}
        <div className="glass-card">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 'bold', marginBottom: '2rem' }}>
            Edit Product
          </h1>
          
          {isLoading && <div style={{marginBottom: '1rem'}}>Loading...</div>}
          {isError && <div style={{color: 'var(--error)', marginBottom: '1rem'}}>{message}</div>}

          <form onSubmit={submitHandler}>
            
            {/* Name */}
            <div className="form-group">
              <label className="form-label">Product Name</label>
              <input
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Price & Stock Row */}
            <div className="grid-2">
              <div className="form-group">
                <label className="form-label">Price (₹)</label>
                <input
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Count In Stock</label>
                <input
                  type="number"
                  placeholder="Enter stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="form-label">Category</label>
              <input
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-field"
              />
            </div>

            {/* Image */}
            <div className="form-group">
              <label className="form-label">Image URL</label>
              <div style={{ display: 'flex', gap: '1rem' }}>
                  <input
                    type="text"
                    placeholder="Enter image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="input-field"
                    style={{ flex: 1 }}
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
                        className="btn-outline"
                        style={{
                          height: '100%',
                          display: 'flex', alignItems: 'center',
                          padding: '0 1.5rem',
                          cursor: 'pointer',
                          whiteSpace: 'nowrap'
                        }}
                    >
                        {uploading ? '...' : <><FaUpload style={{ marginRight: '8px' }}/> Upload</>}
                    </label>
                  </div>
              </div>
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="form-label">Description</label>
              <textarea
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="5"
                className="input-field"
                style={{ resize: 'vertical' }}
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ marginTop: '1rem' }}
            >
              <FaSave style={{ marginRight: '8px' }} /> Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductEditPage;