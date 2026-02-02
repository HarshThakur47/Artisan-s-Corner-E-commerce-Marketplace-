import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProduct, updateProduct, reset } from '../store/slices/productSlice';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';

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
  
  // Get auth token for image upload
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isSuccess && product && product._id === productId) {
        // If update was successful, go back to list
        if(product.name === name) { // Simple check to see if we just updated
           // This logic depends on how your slice handles "success" resets
           // For now, we rely on the button click to redirect, or checking isSuccess from update action
        }
    } else {
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
        dispatch(reset()); // Reset state so we don't get stuck
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link to="/admin" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-6 transition-colors">
        <FaArrowLeft className="mr-2" /> Back to Dashboard
      </Link>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Edit Product</h1>
        
        {isLoading && <p>Loading...</p>}
        {isError && <p className="text-red-500 mb-4">{message}</p>}

        <form onSubmit={submitHandler} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
            <div className="flex gap-4 items-end">
                <input
                type="text"
                placeholder="Enter image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                />
                <div className="relative">
                    <input
                        type="file"
                        id="image-file"
                        onChange={uploadFileHandler}
                        className="hidden"
                    />
                    <label 
                        htmlFor="image-file"
                        className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg border border-gray-300 flex items-center transition-colors"
                    >
                        {uploading ? 'Uploading...' : <><FaUpload className="mr-2"/> Upload</>}
                    </label>
                </div>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Count In Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Count In Stock</label>
            <input
              type="number"
              placeholder="Enter stock"
              value={countInStock}
              onChange={(e) => setCountInStock(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 px-4 rounded-lg transition-colors duration-200"
          >
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditPage;