import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCreditCard } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../utils/config'; 
import { loadRazorpayScript } from '../utils/razorpay';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || 'India',
  });

const handlePayment = async () => {
    // 1. Load Script
    const res = await loadRazorpayScript();
    if (!res) { toast.error('Razorpay SDK failed to load'); return; }

    try {
      // 2. Get Config & Create Razorpay Order
      const { data: key } = await axios.get(`${BASE_URL}/orders/config/razorpay`);
      
      const taxAmount = total * 0.18;
      const shippingAmount = 50;
      const finalTotal = total + shippingAmount + taxAmount;

      const { data: order } = await axios.post(`${BASE_URL}/orders/razorpay`, { 
        amount: Math.round(finalTotal) 
      });

      const options = {
        key: key, 
        amount: order.amount, 
        currency: order.currency,
        name: "Artisan's Corner", 
        description: "Handmade with Love",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment Verified! Saving Order...");

          // --- FIX STARTS HERE ---
          // Convert cartItems to match Backend Schema (map _id to product)
          const formattedOrderItems = cartItems.map((item) => ({
            name: item.name,
            qty: item.qty,
            image: item.image,
            price: item.price,
            product: item._id, // <--- THIS WAS MISSING
          }));
          // --- FIX ENDS HERE ---
          
          const orderData = {
            orderItems: formattedOrderItems, // Use the formatted items
            shippingAddress: formData, 
            paymentMethod: "Razorpay",
            itemsPrice: Number(total),
            taxPrice: Number(taxAmount.toFixed(2)),
            shippingPrice: Number(shippingAmount),
            totalPrice: Number(finalTotal.toFixed(2)),
            paymentResult: { 
              id: response.razorpay_payment_id, 
              status: "success", 
              update_time: String(Date.now()), 
              email_address: user?.email 
            },
          };

          // 3. Save to Database
          const result = await dispatch(createOrder(orderData));
          
          if (createOrder.fulfilled.match(result)) {
             dispatch(clearCart());
             navigate(`/order/${result.payload._id}`);
          } else {
             console.error("Order Creation Failed:", result);
             toast.error("Database Save Failed! Check Console.");
          }
        },
        prefill: { name: user?.name, email: user?.email, contact: "9999999999" },
        theme: { color: "#3399cc" },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error); 
      toast.error("Payment Initiation Failed");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    setCurrentStep(2);
    toast.success('Address Saved');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e8e4dc', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
           <div className={`px-4 py-2 rounded-full font-bold ${currentStep >= 1 ? 'bg-[#1a3a2e] text-white' : 'bg-gray-200'}`}>1. Shipping</div>
           <div className="w-10 h-1 bg-gray-300 self-center mx-2"></div>
           <div className={`px-4 py-2 rounded-full font-bold ${currentStep >= 2 ? 'bg-[#1a3a2e] text-white' : 'bg-gray-200'}`}>2. Payment</div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form */}
          <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', padding: '2rem', borderRadius: '24px' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center"><FaMapMarkerAlt className="mr-2"/> Shipping</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full p-3 rounded-lg border" placeholder="Address" required />
               <input type="text" name="city" value={formData.city} onChange={handleChange} className="w-full p-3 rounded-lg border" placeholder="City" required />
               <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="w-full p-3 rounded-lg border" placeholder="Postal Code" required />
               <input type="text" name="country" value={formData.country} onChange={handleChange} className="w-full p-3 rounded-lg border" placeholder="Country" required />
               <button type="submit" className="w-full bg-gray-800 text-white py-3 rounded-lg font-bold">Save Address</button>
            </form>
          </div>

          {/* Summary */}
          <div style={{ background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(20px)', padding: '2rem', borderRadius: '24px', height: 'fit-content' }}>
            <h2 className="text-xl font-bold mb-6 flex items-center"><FaCreditCard className="mr-2"/> Summary</h2>
            <div className="space-y-4">
              {cartItems.map(item => (
                <div key={item._id} className="flex justify-between">
                   <span>{item.name} x {item.qty}</span>
                   <span className="font-bold">₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="border-t pt-4 flex justify-between text-lg font-bold">
                 <span>Total</span>
                 <span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
              </div>
              <button 
                className={`w-full py-4 rounded-xl font-bold text-white transition-all ${currentStep === 1 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1a3a2e] hover:bg-[#142d24]'}`} 
                onClick={handlePayment}
                disabled={currentStep === 1}
              >
                Pay & Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;