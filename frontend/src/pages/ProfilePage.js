import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/slices/orderSlice';
import { FaUser, FaTimes, FaCheck } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, message } = useSelector((state) => state.order);
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: `2px solid ${colors.divider}`, marginBottom: '2rem', position: 'relative' }}>
          {['profile', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0', background: 'transparent', border: 'none', fontSize: '1rem',
                fontWeight: activeTab === tab ? '600' : '500',
                color: activeTab === tab ? colors.primary : colors.textSecondary,
                cursor: 'pointer', position: 'relative', transition: 'all 0.3s ease'
              }}
            >
              {tab === 'profile' ? 'My Profile' : 'My Orders'}
              {activeTab === tab && (
                <div style={{
                  position: 'absolute', bottom: '-2px', left: 0, right: 0, height: '3px',
                  background: colors.primary, borderRadius: '3px 3px 0 0', animation: 'slideIn 0.3s ease'
                }} />
              )}
            </button>
          ))}
        </div>
        <style>{`@keyframes slideIn { from { transform: scaleX(0); } to { transform: scaleX(1); } }`}</style>

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div style={{
            background: colors.surface, borderRadius: '24px', padding: '2rem', maxWidth: '500px',
            boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}`, animation: 'fadeIn 0.4s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.text }}>
              <FaUser color={colors.primary} /> My Profile
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <label style={{ fontSize: '0.875rem', color: colors.textSecondary }}>Name</label>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', color: colors.text }}>{user?.name}</p>
              </div>
              <div>
                <label style={{ fontSize: '0.875rem', color: colors.textSecondary }}>Email</label>
                <p style={{ fontSize: '1.125rem', fontWeight: '500', color: colors.text }}>{user?.email}</p>
              </div>
              <div>
                 <span style={{ padding: '4px 12px', borderRadius: '12px', background: `${colors.primary}20`, color: colors.primary, fontSize: '0.875rem', fontWeight: '600' }}>
                   {user?.isAdmin ? 'Admin' : 'Customer'}
                 </span>
              </div>
            </div>
          </div>
        )}

        {/* Orders Content */}
        {activeTab === 'orders' && (
          <div style={{
             background: colors.surface, borderRadius: '24px', padding: '2rem',
             boxShadow: `0 4px 12px ${colors.shadow}`, border: `1px solid ${colors.border}`, animation: 'fadeIn 0.4s ease'
          }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1.5rem', color: colors.text }}>My Orders</h2>
            {isLoading ? <div style={{color: colors.text}}>Loading...</div> : orders?.length === 0 ? (
              <div style={{ textAlign: 'center', color: colors.textSecondary }}>
                No orders yet. <Link to="/products" style={{ color: colors.primary }}>Shop Now</Link>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${colors.divider}`, textAlign: 'left' }}>
                      {['ID', 'Total', 'Paid', 'Delivered', 'Action'].map(h => (
                        <th key={h} style={{ padding: '1rem', color: colors.textSecondary, fontSize: '0.875rem', fontWeight: '600' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id} style={{ borderBottom: `1px solid ${colors.divider}` }}>
                        <td style={{ padding: '1rem', color: colors.text }}>{order._id.substring(0, 8)}...</td>
                        <td style={{ padding: '1rem', color: colors.text }}>₹{order.totalPrice}</td>
                        <td style={{ padding: '1rem' }}>
                           {order.isPaid ? <FaCheck color={colors.success} /> : <FaTimes color={colors.error} />}
                        </td>
                        <td style={{ padding: '1rem' }}>
                           {order.isDelivered ? <FaCheck color={colors.success} /> : <FaTimes color={colors.error} />}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <Link to={`/order/${order._id}`} style={{ color: colors.primary, fontWeight: '600', textDecoration: 'none' }}>
                            View
                          </Link>
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
      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
};

export default ProfilePage;