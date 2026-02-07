import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { FaTrash, FaArrowLeft } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);
  const { colors } = useTheme();

  return (
    <div style={{
      minHeight: '100vh',
      background: colors.background,
      paddingTop: '100px',
      paddingBottom: '80px'
    }}>
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', color: colors.text }}>
          Shopping Cart
        </h1>
        
        {cartItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '5rem',
            background: colors.surface,
            borderRadius: '16px',
            boxShadow: `0 4px 12px ${colors.shadow}`,
            border: `1px solid ${colors.border}`
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '500', marginBottom: '1rem', color: colors.text }}>
              Your cart is empty
            </h2>
            <Link to="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              color: colors.primary, textDecoration: 'none', fontWeight: '600'
            }}>
              <FaArrowLeft /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            
            {/* Items List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map((item) => (
                <div key={item._id} style={{
                  background: colors.surface,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  border: `1px solid ${colors.border}`,
                  display: 'flex',
                  gap: '1.5rem',
                  alignItems: 'center',
                  boxShadow: `0 2px 8px ${colors.shadow}`
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                  
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item.product}`} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontWeight: '600', fontSize: '1.125rem', color: colors.text, marginBottom: '0.5rem' }}>
                        {item.name}
                      </h3>
                    </Link>
                    <p style={{ color: colors.primary, fontWeight: '700', fontSize: '1.125rem', marginBottom: '1rem' }}>
                      ₹{item.price}
                    </p>
                    
                    {/* Quantity Buttons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, qty: Math.max(1, item.qty - 1) }))}
                        disabled={item.qty === 1}
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `2px solid ${item.qty === 1 ? colors.border : colors.primary}`,
                          background: 'transparent', color: item.qty === 1 ? colors.textSecondary : colors.primary,
                          fontSize: '16px', fontWeight: '600', cursor: item.qty === 1 ? 'not-allowed' : 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                        }}
                      >-</button>
                      
                      <span style={{ fontSize: '1rem', fontWeight: '600', color: colors.text, minWidth: '30px', textAlign: 'center' }}>
                        {item.qty}
                      </span>
                      
                      <button
                        onClick={() => dispatch(updateQuantity({ id: item._id, qty: item.qty + 1 }))}
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px',
                          border: `2px solid ${colors.primary}`,
                          background: 'transparent', color: colors.primary,
                          fontSize: '16px', fontWeight: '600', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s'
                        }}
                      >+</button>
                    </div>
                  </div>

                  <button 
                    onClick={() => dispatch(removeFromCart(item._id))}
                    style={{
                      background: `${colors.error}15`, color: colors.error,
                      border: 'none', padding: '10px', borderRadius: '50%',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = `${colors.error}30`}
                    onMouseLeave={(e) => e.target.style.background = `${colors.error}15`}
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              background: colors.surface,
              borderRadius: '24px',
              padding: '2rem',
              boxShadow: `0 8px 32px ${colors.shadow}`,
              border: `1px solid ${colors.border}`,
              height: 'fit-content',
              position: 'sticky',
              top: '100px'
            }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', color: colors.text }}>
                Order Summary
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
                  <span>Subtotal</span><span>₹{total}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
                  <span>Shipping</span><span>₹50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: colors.textSecondary }}>
                  <span>Tax (18%)</span><span>₹{(total * 0.18).toFixed(0)}</span>
                </div>
                <div style={{ 
                  display: 'flex', justifyContent: 'space-between', 
                  fontSize: '1.125rem', fontWeight: 'bold', color: colors.text,
                  paddingTop: '1rem', borderTop: `1px solid ${colors.divider}` 
                }}>
                  <span>Total</span><span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
                </div>
              </div>
              <Link to="/checkout" style={{
                display: 'block', width: '100%', padding: '16px', textAlign: 'center',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                color: '#fff', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                textDecoration: 'none', boxShadow: `0 4px 12px ${colors.shadow}`,
                transition: 'all 0.3s ease'
              }}>
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;