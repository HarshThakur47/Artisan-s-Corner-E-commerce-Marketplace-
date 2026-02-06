import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/slices/orderSlice';
import { FaUser, FaTimes, FaCheck } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { orders, isLoading, isError, message } = useSelector((state) => state.order);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div style={{ minHeight: '100vh', background: '#e8e4dc', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container max-w-7xl mx-auto px-4">
        
        {/* Tab Navigation */}
        <div style={{ display: 'flex', gap: '2rem', borderBottom: '2px solid rgba(0,0,0,0.06)', marginBottom: '3rem' }}>
          {['profile', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '1rem 0', background: 'transparent', border: 'none', fontSize: '1rem',
                fontWeight: '500', cursor: 'pointer',
                color: activeTab === tab ? '#1a3a2e' : '#999',
                borderBottom: activeTab === tab ? '2px solid #1a3a2e' : 'none'
              }}
            >
              {tab === 'profile' ? 'My Profile' : 'My Orders'}
            </button>
          ))}
        </div>

        {/* Profile Content */}
        {activeTab === 'profile' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)',
            borderRadius: '24px', padding: '2rem', maxWidth: '500px',
            animation: 'fadeIn 0.4s ease'
          }}>
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <FaUser className="mr-2 text-primary-600" /> My Profile
            </h2>
            <div className="space-y-4">
              <div><label className="text-sm text-gray-500">Name</label><p className="font-medium text-lg">{user?.name}</p></div>
              <div><label className="text-sm text-gray-500">Email</label><p className="font-medium text-lg">{user?.email}</p></div>
              <div><span className={`px-2 py-1 rounded text-sm ${user?.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{user?.isAdmin ? 'Admin' : 'Customer'}</span></div>
            </div>
          </div>
        )}

        {/* Orders Content */}
        {activeTab === 'orders' && (
          <div style={{
             background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)',
             borderRadius: '24px', padding: '2rem', animation: 'fadeIn 0.4s ease'
          }}>
            <h2 className="text-2xl font-bold mb-6">My Orders</h2>
            {isLoading ? <div className="text-center">Loading...</div> : orders?.length === 0 ? (
              <div className="text-center text-gray-500">No orders yet. <Link to="/products" className="text-primary-600 underline">Shop Now</Link></div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 text-sm font-medium">{order._id.substring(0, 8)}...</td>
                        <td className="px-6 py-4 text-sm">₹{order.totalPrice}</td>
                        <td className="px-6 py-4">{order.isPaid ? <FaCheck className="text-green-500"/> : <FaTimes className="text-red-500"/>}</td>
                        <td className="px-6 py-4"><Link to={`/order/${order._id}`} className="text-primary-600 hover:underline">View</Link></td>
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