import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../store/slices/orderSlice';
import { FaUser, FaTruck, FaCreditCard, FaBoxOpen, FaCheckCircle, FaClock } from 'react-icons/fa';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { order, isLoading, isError, message } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  // Helper: Calculate Estimated Delivery (Current Date + 5 Days)
  const getEstimatedDate = (dateString) => {
    if (!dateString) return 'Pending';
    const date = new Date(dateString);
    date.setDate(date.getDate() + 5); // Add 5 days
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  if (isLoading) return <div className="text-center py-20">Loading Order Details...</div>;
  if (isError) return <div className="text-center py-20 text-red-500">{message}</div>;
  if (!order) return null;

  return (
    <div style={{ minHeight: '100vh', background: '#f5f7f9', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Order Details</h1>
            <p className="text-gray-500 mt-1">Order ID: #{order._id}</p>
          </div>
          <Link to="/products" className="btn-outline text-sm">Continue Shopping</Link>
        </div>

        {/* PROGRESS BAR (Amazon Style) */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-lg font-semibold mb-6 flex items-center">
            <FaClock className="mr-2 text-primary-600" /> 
            Estimated Delivery: <span className="text-green-600 ml-2">{getEstimatedDate(order.createdAt)}</span>
          </h2>
          
          <div className="relative flex justify-between items-center max-w-3xl mx-auto">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-0"></div>
            <div 
              className="absolute top-1/2 left-0 h-1 bg-green-500 -z-0 transition-all duration-1000"
              style={{ width: order.isDelivered ? '100%' : order.isPaid ? '50%' : '5%' }}
            ></div>

            {/* Step 1: Placed */}
            <div className="relative z-10 flex flex-col items-center bg-white px-2">
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                <FaCheckCircle />
              </div>
              <p className="text-sm font-medium mt-2">Order Placed</p>
            </div>

            {/* Step 2: Processing/Paid */}
            <div className="relative z-10 flex flex-col items-center bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${order.isPaid ? 'bg-green-500' : 'bg-gray-300'}`}>
                {order.isPaid ? <FaCheckCircle /> : '2'}
              </div>
              <p className={`text-sm font-medium mt-2 ${order.isPaid ? 'text-gray-900' : 'text-gray-400'}`}>Payment Confirmed</p>
            </div>

            {/* Step 3: Delivered */}
            <div className="relative z-10 flex flex-col items-center bg-white px-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${order.isDelivered ? 'bg-green-500' : 'bg-gray-300'}`}>
                {order.isDelivered ? <FaCheckCircle /> : '3'}
              </div>
              <p className={`text-sm font-medium mt-2 ${order.isDelivered ? 'text-gray-900' : 'text-gray-400'}`}>Delivered</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Items & Shipping */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center"><FaBoxOpen className="mr-2 text-primary-600"/> Items in your order</h2>
              <div className="divide-y divide-gray-100">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="py-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-lg border border-gray-100" />
                    <div className="ml-4 flex-1">
                      <Link to={`/product/${item.product}`} className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        {item.name}
                      </Link>
                      <p className="text-gray-500 text-sm mt-1">Qty: {item.qty} × ₹{item.price}</p>
                    </div>
                    <div className="text-lg font-bold">₹{item.qty * item.price}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold mb-3 flex items-center"><FaTruck className="mr-2 text-gray-400"/> Shipping Address</h3>
                <p className="text-gray-600 leading-relaxed">
                  {order.user?.name}<br/>
                  {order.shippingAddress.address}<br/>
                  {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br/>
                  {order.shippingAddress.country}
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="font-bold mb-3 flex items-center"><FaCreditCard className="mr-2 text-gray-400"/> Payment Info</h3>
                <p className="text-gray-600">Method: {order.paymentMethod}</p>
                <p className={`mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {order.isPaid ? `Paid on ${new Date(order.paidAt).toLocaleDateString()}` : 'Payment Pending'}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600"><span>Items Subtotal</span><span>₹{order.itemsPrice}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹{order.shippingPrice}</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{order.taxPrice}</span></div>
              </div>
              <div className="flex justify-between pt-6">
                <span className="text-xl font-bold">Order Total</span>
                <span className="text-xl font-bold text-primary-600">₹{order.totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;