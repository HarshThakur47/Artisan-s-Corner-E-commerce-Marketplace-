import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct, addReview } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar, FaShoppingCart } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { user } = useSelector((state) => state.auth);
  
  const [quantity, setQuantity] = useState(1);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  useEffect(() => {
    dispatch(getProduct(id));
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      const productWithQty = { ...product, qty: quantity };
      dispatch(addToCart(productWithQty));
      toast.success(`${product.name} added to cart!`);
    }
  };

  const createRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    ripple.style.cssText = `
      position: absolute; border-radius: 50%; background: rgba(255,255,255,0.6);
      width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px;
      animation: ripple 0.6s ease-out; pointer-events: none;
    `;
    button.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  if (isLoading || !product) return <div className="text-center pt-32">Loading...</div>;

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8e4dc',
      paddingTop: '100px',
      paddingBottom: '80px'
    }}>
      <style>{`@keyframes ripple { to { transform: scale(4); opacity: 0; } }`}</style>
      <div className="container max-w-7xl mx-auto px-4">
        <div style={{
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
          borderRadius: '24px',
          padding: '3rem',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          border: '1px solid rgba(255, 255, 255, 0.8)',
          animation: 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-96">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>

            {/* Details */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">({product.numReviews} reviews)</span>
              </div>
              <p className="text-3xl font-bold text-primary-600 mb-6">₹{product.price}</p>
              <p className="text-gray-600 mb-8 leading-relaxed">{product.description}</p>
              
              <div className="flex items-center space-x-6 mb-8">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-2 hover:bg-gray-100">-</button>
                  <span className="px-4 font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))} className="px-4 py-2 hover:bg-gray-100">+</button>
                </div>
                <span className="text-sm text-gray-500">{product.countInStock} available</span>
              </div>

              <button
                onClick={(e) => { handleAddToCart(); createRipple(e); }}
                disabled={product.countInStock === 0}
                className="btn-primary w-full py-4 text-lg font-semibold relative overflow-hidden"
              >
                {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;