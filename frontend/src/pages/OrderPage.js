import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../store/slices/orderSlice';
import { FaTruck, FaCreditCard, FaBoxOpen } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading, isError, message } = useSelector((state) => state.order);
  const { colors } = useTheme();

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (isLoading) return <div style={{ paddingTop: '100px', textAlign: 'center', color: colors.text }}>Loading...</div>;
  if (isError) return <div style={{ paddingTop: '100px', textAlign: 'center', color: colors.error }}>{message}</div>;
  if (!order) return null;

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: colors.text }}>Order Details</h1>
            <p style={{ color: colors.textSecondary }}>Order ID: #{order._id}</p>
          </div>
          <Link to="/products" style={{
            padding: '10px 20px', border: `1px solid ${colors.border}`, borderRadius: '10px',
            color: colors.text, textDecoration: 'none', fontWeight: '500'
          }}>Continue Shopping</Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          
          {/* Timeline & Status */}
          <div style={{ background: colors.surface, padding: '2rem', borderRadius: '16px', boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '2rem', color: colors.text }}>Order Status</h2>
            <div style={{ position: 'relative', paddingLeft: '2rem' }}>
              <div style={{ position: 'absolute', left: '0.9rem', top: 0, bottom: 0, width: '2px', background: colors.divider }} />
              
              {[
                { label: 'Order Placed', completed: true },
                { label: 'Payment Confirmed', completed: order.isPaid },
                { label: 'Delivered', completed: order.isDelivered }
              ].map((step, i) => (
                <div key={i} style={{ position: 'relative', marginBottom: '2rem', paddingLeft: '1rem' }}>
                  <div style={{
                    position: 'absolute', left: '-1.6rem', width: '24px', height: '24px', borderRadius: '50%',
                    background: step.completed ? colors.success : colors.surfaceLight,
                    border: `2px solid ${step.completed ? colors.success : colors.border}`,
                    zIndex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '12px'
                  }}>
                    {step.completed ? '✓' : ''}
                  </div>
                  <h3 style={{ fontSize: '1rem', fontWeight: '600', color: step.completed ? colors.text : colors.textSecondary }}>{step.label}</h3>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             {/* Items */}
             <div style={{ background: colors.surface, padding: '2rem', borderRadius: '16px', boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: colors.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaBoxOpen color={colors.primary} /> Items
                </h3>
                {order.orderItems.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem 0', borderBottom: `1px solid ${colors.divider}` }}>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                      <img src={item.image} alt="" style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                      <div>
                        <p style={{ fontWeight: '500', color: colors.text }}>{item.name}</p>
                        <p style={{ fontSize: '0.875rem', color: colors.textSecondary }}>x{item.qty}</p>
                      </div>
                    </div>
                    <p style={{ fontWeight: '600', color: colors.text }}>₹{item.price * item.qty}</p>
                  </div>
                ))}
             </div>

             {/* Shipping & Payment */}
             <div style={{ background: colors.surface, padding: '2rem', borderRadius: '16px', boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}` }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '1rem', color: colors.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaTruck color={colors.primary} /> Delivery Info
                </h3>
                <p style={{ color: colors.text, lineHeight: '1.6' }}>
                  {order.shippingAddress.address}<br/>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                  {order.shippingAddress.country}
                </p>
                
                <h3 style={{ fontSize: '1.1rem', fontWeight: 'bold', margin: '1.5rem 0 1rem', color: colors.text, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCreditCard color={colors.primary} /> Payment
                </h3>
                <p style={{ color: colors.text }}>Method: {order.paymentMethod}</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderPage;