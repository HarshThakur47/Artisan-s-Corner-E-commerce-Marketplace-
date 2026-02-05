import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderById } from '../store/slices/orderSlice';
import { FaUser, FaTruck, FaCreditCard, FaBoxOpen } from 'react-icons/fa';
import { toast } from 'react-toastify';

const OrderPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { order, isLoading, isError, message } = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold text-red-600">Error Loading Order</h2>
        <p className="text-gray-600">{message}</p>
        <Link to="/" className="btn-primary mt-4 inline-block">Go Home</Link>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Order ID: {order._id}</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Shipping Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaTruck className="mr-2 text-primary-600" /> Shipping
            </h2>
            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> <a href={`mailto:${order.user?.email}`} className="text-blue-600">{order.user?.email}</a></p>
            <p className="mt-2">
              <strong>Address:</strong><br />
              {order.shippingAddress.address}, {order.shippingAddress.city}<br />
              {order.shippingAddress.postalCode}, {order.shippingAddress.country}
            </p>
            
            <div className={`mt-4 p-3 rounded-md ${order.isDelivered ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {order.isDelivered ? `Delivered on ${order.deliveredAt?.substring(0, 10)}` : 'Not Delivered'}
            </div>
          </div>

          {/* 2. Payment Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaCreditCard className="mr-2 text-primary-600" /> Payment
            </h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
            
            <div className={`mt-4 p-3 rounded-md ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {order.isPaid ? `Paid on ${order.paidAt?.substring(0, 10)}` : 'Not Paid'}
            </div>
          </div>

          {/* 3. Order Items */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <FaBoxOpen className="mr-2 text-primary-600" /> Order Items
            </h2>
            {order.orderItems.length === 0 ? (
              <p>Order is empty</p>
            ) : (
              <div className="divide-y divide-gray-200">
                {order.orderItems.map((item, index) => (
                  <div key={index} className="py-4 flex items-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                    <div className="ml-4 flex-1">
                      <Link to={`/product/${item.product}`} className="text-lg font-medium text-gray-900 hover:text-primary-600">
                        {item.name}
                      </Link>
                      <p className="text-gray-500">
                        {item.qty} x ₹{item.price} = <strong>₹{item.qty * item.price}</strong>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-3 border-b border-gray-200 pb-4">
              <div className="flex justify-between">
                <span>Items</span>
                <span>₹{order.itemsPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{order.shippingPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>₹{order.taxPrice}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg pt-4">
              <span>Total</span>
              <span>₹{order.totalPrice}</span>
            </div>
            
            {/* If you add Admin features later, the "Mark as Delivered" button goes here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;