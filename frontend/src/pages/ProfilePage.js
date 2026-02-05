import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserOrders } from '../store/slices/orderSlice';
import { FaUser, FaTimes, FaCheck } from 'react-icons/fa';

const ProfilePage = () => {
  const dispatch = useDispatch();

  // 1. Get User Info from Auth State
  const { user } = useSelector((state) => state.auth);

  // 2. Get Order History from Order State
  const { orders, isLoading, isError, message } = useSelector((state) => state.order);

  // 3. Fetch Orders when page loads
  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Column: User Profile Card */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <FaUser className="mr-2 text-primary-600" /> My Profile
            </h2>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 block">Name</label>
                <p className="font-medium text-lg">{user?.name}</p>
              </div>
              
              <div>
                <label className="text-sm text-gray-500 block">Email</label>
                <p className="font-medium text-lg text-gray-700">{user?.email}</p>
              </div>

              <div>
                 <label className="text-sm text-gray-500 block">Account Type</label>
                 <span className={`px-2 py-1 rounded text-sm ${user?.isAdmin ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>
                   {user?.isAdmin ? 'Admin' : 'Customer'}
                 </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Order History Table */}
        <div className="md:col-span-3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h2>

            {isLoading ? (
              <div className="flex justify-center py-8">
                 <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary-600"></div>
              </div>
            ) : isError ? (
              <div className="text-red-500 bg-red-50 p-3 rounded">{message}</div>
            ) : orders && orders.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                You haven't placed any orders yet. 
                <Link to="/products" className="text-primary-600 ml-2 hover:underline">Start Shopping</Link>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paid</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivered</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id.substring(0, 10)}...</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.createdAt.substring(0, 10)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{order.totalPrice}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.isPaid ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.paidAt.substring(0, 10)}
                            </span>
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {order.isDelivered ? (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {order.deliveredAt.substring(0, 10)}
                            </span>
                          ) : (
                            <FaTimes className="text-red-500" />
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <Link to={`/order/${order._id}`} className="text-primary-600 hover:text-primary-900 bg-gray-100 px-3 py-1 rounded hover:bg-gray-200 transition">
                            Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;