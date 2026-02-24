import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/slices/orderSlice';
import { FaUser, FaBoxOpen } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="page-wrapper">
      <div className="container">
        
        {/* Tabs */}
        <div className="tab-group">
          <button 
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            My Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            My Orders
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="glass-card" style={{ maxWidth: '500px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'var(--surface-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FaUser size={24} color="var(--primary)" />
              </div>
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{user?.name}</h2>
                <p style={{ color: 'var(--text-secondary)' }}>{user?.email}</p>
              </div>
            </div>
            <div className="badge badge-success">
              {user?.isAdmin ? 'Administrator' : 'Customer Account'}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="glass-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Order History</h2>
            
            {isLoading ? (
              <p>Loading orders...</p>
            ) : orders?.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem' }}>
                <FaBoxOpen size={40} color="var(--border)" />
                <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>No orders yet</p>
                <Link to="/products" style={{ color: 'var(--primary)', fontWeight: '600' }}>Start Shopping</Link>
              </div>
            ) : (
              <div className="table-container">
                <table className="styled-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Date</th>
                      <th>Total</th>
                      <th>Paid</th>
                      <th>Delivered</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order._id.substring(0, 8)}...</td>
                        <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        <td>₹{order.totalPrice}</td>
                        <td>
                          <span className={`badge ${order.isPaid ? 'badge-success' : 'badge-danger'}`}>
                            {order.isPaid ? 'Paid' : 'Unpaid'}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${order.isDelivered ? 'badge-success' : 'badge-warning'}`}>
                            {order.isDelivered ? 'Delivered' : 'Processing'}
                          </span>
                        </td>
                        <td>
                          <Link to={`/order/${order._id}`} style={{ color: 'var(--primary)', fontWeight: '600' }}>View</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;