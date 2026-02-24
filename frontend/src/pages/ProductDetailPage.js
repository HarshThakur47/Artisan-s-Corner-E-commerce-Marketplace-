import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { dispatch(getProduct(id)); }, [dispatch, id]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart({ ...product, qty: quantity }));
      toast.success(`${product.name} added to cart!`);
    }
  };

  if (isLoading || !product) return <div className="page-wrapper"><div className="container">Loading...</div></div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <div className="glass-card">
          <div className="grid-2">
            
            {/* Left: Image */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', background: 'var(--surface-light)' }}>
              <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Right: Info */}
            <div>
              <h1 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '1rem' }}>{product.name}</h1>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', color: '#F59E0B' }}>
                  {[...Array(5)].map((_, i) => <FaStar key={i} color={i < product.rating ? '#F59E0B' : 'var(--border)'} />)}
                </div>
                <span style={{ color: 'var(--text-secondary)' }}>({product.numReviews} reviews)</span>
              </div>

              <p style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary)', marginBottom: '1.5rem' }}>₹{product.price}</p>
              
              <p style={{ lineHeight: '1.8', marginBottom: '2rem', color: 'var(--text-secondary)' }}>{product.description}</p>

              <div style={{ marginBottom: '2rem' }}>
                <label className="form-label">Quantity</label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <button className="btn-outline" onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ padding: '8px 16px' }}>-</button>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>{quantity}</span>
                  <button className="btn-outline" onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))} style={{ padding: '8px 16px' }}>+</button>
                </div>
              </div>

              <button 
                onClick={handleAddToCart}
                disabled={product.countInStock === 0}
                className="btn-primary"
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