import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { saveShippingAddress, savePaymentMethod, clearCart } from '../store/slices/cartSlice'; // Add clearCart
import { createOrder } from '../store/slices/orderSlice'; // Import createOrder
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../utils/config'; 
import { loadRazorpayScript } from '../utils/razorpay';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth); // Get user info

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || 'India',
  });

  // 1. Move Payment Logic INSIDE the component
  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    try {
      // Get Key
      const { data: key } = await axios.get(`${BASE_URL}/orders/config/razorpay`);

      // Create Razorpay Order
      // USE REAL TOTAL, NOT 500
      const orderAmount = total + 50 + (total * 0.18); // Total + Shipping + Tax
      const { data: order } = await axios.post(`${BASE_URL}/orders/razorpay`, {
        amount: orderAmount.toFixed(0), 
      });

      const options = {
        key: key, 
        amount: order.amount,
        currency: order.currency,
        name: "Artisan's Corner",
        description: "Handmade with Love",
        order_id: order.id, 
        handler: async function (response) {
          // --- PAYMENT SUCCESSFUL ---
          toast.success("Payment Successful!");

          // 2. NOW SAVE ORDER TO DATABASE
          const orderData = {
            orderItems: cartItems,
            shippingAddress: formData,
            paymentMethod: "Razorpay",
            itemsPrice: total,
            taxPrice: (total * 0.18).toFixed(0),
            shippingPrice: 50,
            totalPrice: orderAmount.toFixed(0),
            paymentResult: {
              id: response.razorpay_payment_id,
              status: "success",
              update_time: Date.now(),
              email_address: user?.email,
            },
          };

          // Dispatch Action
          const result = await dispatch(createOrder(orderData));
          
          if (createOrder.fulfilled.match(result)) {
             dispatch(clearCart()); // Empty the cart
             navigate(`/order/${result.payload._id}`); // Go to Order Page
          }
        },
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Payment Error:", error);
      toast.error("Something went wrong with the payment.");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    dispatch(savePaymentMethod('Razorpay'));
    toast.success('Shipping information saved!');
  };

  if (cartItems.length === 0) {
    return <div className="p-8 text-center">Your cart is empty</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Shipping Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FaMapMarkerAlt className="mr-2 text-primary-600" /> Shipping Information
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
             {/* ... Keep your existing form inputs here ... */}
             <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="Address" required />
             <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" required />
             <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="input-field" placeholder="Postal Code" required />
             <input type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" placeholder="Country" required />
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
             <FaCreditCard className="mr-2 text-primary-600" /> Order Summary
          </h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                 <span>{item.name} (x{item.qty})</span>
                 <span>₹{item.price * item.qty}</span>
              </div>
            ))}
            <div className="border-t pt-4 font-bold text-lg flex justify-between">
               <span>Total:</span>
               <span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
            </div>
            {/* The Button Now Works */}
            <button className="btn-primary w-full mt-4" onClick={handlePayment}>
              Pay & Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;