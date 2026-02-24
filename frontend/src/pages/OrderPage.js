import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../store/slices/orderSlice';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  
  const orderState = useSelector((state) => state.order) || {};
  const { order, isLoading, error } = orderState;

  useEffect(() => {
    dispatch(getOrderById(id)); 
  }, [dispatch, id]);

  if (isLoading) return <div className="page-wrapper"><div className="container">Loading...</div></div>;
  if (error) return <div className="page-wrapper"><div className="container">Error: {error}</div></div>;
  if (!order) return <div className="page-wrapper"><div className="container">Order not found</div></div>;

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 style={{ marginBottom: '2rem', fontSize: '2rem', fontWeight: 'bold' }}>Order {order._id}</h1>
        
        {/* Use grid-2-1 for Main Content (Left) vs Summary (Right) */}
        <div className="grid-2-1" style={{ gap: '2rem', display: 'grid' }}>
          
          {/* LEFT COLUMN: Details & Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            
            {/* 1. Shipping & Payment Info */}
            <div className="glass-card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Shipping & Payment</h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Name:</strong> {order.user?.name}
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Email:</strong> <a href={`mailto:${order.user?.email}`} style={{ color: 'var(--primary)' }}>{order.user?.email}</a>
                </p>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}
                </p>
                <div className={`badge ${order.isDelivered ? 'badge-success' : 'badge-warning'}`}>
                  {order.isDelivered ? `Delivered on ${order.deliveredAt}` : 'Not Delivered'}
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  <strong>Payment Method:</strong> {order.paymentMethod}
                </p>
                <div className={`badge ${order.isPaid ? 'badge-success' : 'badge-danger'}`}>
                  {order.isPaid ? `Paid on ${order.paidAt}` : 'Not Paid'}
                </div>
              </div>
            </div>

            {/* 2. Order Items List */}
            <div className="glass-card">
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600' }}>Order Items</h2>
              {(order.orderItems || []).map((item, index) => (
                <div key={index} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-img" />
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item.product}`} style={{ fontWeight: '600', textDecoration: 'none', fontSize: '1.1rem' }}>
                      {item.name}
                    </Link>
                    <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                      {item.qty} x ₹{item.price} = <strong style={{ color: 'var(--text)' }}>₹{item.qty * item.price}</strong>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: Amazon-style Order Summary */}
          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: '600' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Items Price:</span>
              {/* Safety Check: Default to 0 if undefined */}
              <span>₹{order.itemsPrice || 0}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Shipping:</span>
              <span>₹{order.shippingPrice || 0}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
              <span>Tax:</span>
              <span>₹{order.taxPrice || 0}</span>
            </div>

            <div style={{ 
              borderTop: '1px dashed var(--border)', 
              marginTop: '1rem', 
              paddingTop: '1rem', 
              display: 'flex', 
              justifyContent: 'space-between', 
              fontWeight: 'bold', 
              fontSize: '1.25rem' 
            }}>
              <span>Order Total:</span>
              <span style={{ color: 'var(--primary)' }}>₹{order.totalPrice || 0}</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OrderPage;