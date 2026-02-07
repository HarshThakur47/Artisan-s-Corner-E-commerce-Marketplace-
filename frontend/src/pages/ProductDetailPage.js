import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../store/slices/productSlice';
import { addToCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';
import { FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { product, isLoading } = useSelector((state) => state.product);
  const { colors } = useTheme();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

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

  // Safe image handling (creates an array even if only one image exists)
  const productImages = product?.images?.length > 0 ? product.images : [product?.image];

  if (isLoading || !product) return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingTop: '100px', textAlign: 'center', color: colors.text }}>
      Loading...
    </div>
  );

  return (
    <div style={{ background: colors.background, minHeight: '100vh', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '3rem',
          background: colors.surface,
          padding: '3rem',
          borderRadius: '16px',
          boxShadow: `0 8px 24px ${colors.shadow}`,
          border: `1px solid ${colors.border}`
        }}>
          
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{
              marginBottom: '1rem',
              borderRadius: '12px',
              overflow: 'hidden',
              height: '400px',
              background: colors.background
            }}>
              <img 
                src={productImages[selectedImage]}
                alt={product.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
            
            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div style={{ display: 'flex', gap: '1rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
                {productImages.map((img, i) => (
                  <div
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      border: selectedImage === i ? `3px solid ${colors.primary}` : `1px solid ${colors.border}`,
                      transition: 'all 0.3s ease',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div>
            <h1 style={{ color: colors.text, marginBottom: '1rem', fontSize: '2.5rem', fontWeight: 'bold' }}>
              {product.name}
            </h1>

            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', color: '#ffb400', marginRight: '0.5rem' }}>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} color={i < product.rating ? '#ffb400' : colors.border} />
                ))}
              </div>
              <span style={{ color: colors.textSecondary }}>({product.numReviews} reviews)</span>
            </div>

            <p style={{ fontSize: '2rem', fontWeight: '700', color: colors.primary, marginBottom: '1.5rem' }}>
              ₹{product.price}
            </p>

            <p style={{ color: colors.text, lineHeight: '1.8', marginBottom: '2rem' }}>
              {product.description}
            </p>
            
            {/* Quantity Selector */}
            <div style={{ marginBottom: '2rem' }}>
              <p style={{ marginBottom: '0.5rem', fontWeight: '600', color: colors.text }}>Quantity</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    border: `2px solid ${colors.primary}`, background: 'transparent',
                    color: colors.primary, fontSize: '20px', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.primary; }}
                >
                  -
                </button>
                
                <span style={{ fontSize: '1.25rem', fontWeight: '600', color: colors.text, minWidth: '40px', textAlign: 'center' }}>
                  {quantity}
                </span>
                
                <button
                  onClick={() => setQuantity(Math.min(product.countInStock, quantity + 1))}
                  style={{
                    width: '40px', height: '40px', borderRadius: '10px',
                    border: `2px solid ${colors.primary}`, background: 'transparent',
                    color: colors.primary, fontSize: '20px', fontWeight: '600',
                    cursor: 'pointer', transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = colors.primary; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = colors.primary; }}
                >
                  +
                </button>
                <span style={{ marginLeft: '1rem', color: colors.textSecondary }}>
                  {product.countInStock > 0 ? `${product.countInStock} available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              style={{
                width: '100%',
                padding: '16px',
                background: product.countInStock === 0 ? colors.border : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: '#fff',
                border: 'none',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: product.countInStock === 0 ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: `0 4px 12px ${colors.shadow}`
              }}
              onMouseEnter={(e) => {
                if(product.countInStock > 0) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 8px 20px ${colors.shadow}`;
                }
              }}
              onMouseLeave={(e) => {
                if(product.countInStock > 0) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 12px ${colors.shadow}`;
                }
              }}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;