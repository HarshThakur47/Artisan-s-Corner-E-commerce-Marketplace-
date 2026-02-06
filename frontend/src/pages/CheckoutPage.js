import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, savePaymentMethod, clearCart } from '../store/slices/cartSlice';
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
  const [currentStep, setCurrentStep] = useState(1); // Added Step State

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || 'India',
  });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) { toast.error('Razorpay SDK failed to load'); return; }

    try {
      const { data: key } = await axios.get(`${BASE_URL}/orders/config/razorpay`);
      const orderAmount = total + 50 + (total * 0.18);
      const { data: order } = await axios.post(`${BASE_URL}/orders/razorpay`, { amount: orderAmount.toFixed(0) });

      const options = {
        key: key, amount: order.amount, currency: order.currency,
        name: "Artisan's Corner", description: "Handmade with Love",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment Successful!");
          const orderData = {
            orderItems: cartItems, shippingAddress: formData, paymentMethod: "Razorpay",
            itemsPrice: total, taxPrice: (total * 0.18).toFixed(0), shippingPrice: 50,
            totalPrice: orderAmount.toFixed(0),
            paymentResult: { id: response.razorpay_payment_id, status: "success", update_time: Date.now(), email_address: user?.email },
          };
          const result = await dispatch(createOrder(orderData));
          if (createOrder.fulfilled.match(result)) {
             dispatch(clearCart());
             navigate(`/order/${result.payload._id}`);
          }
        },
        prefill: { name: user?.name, email: user?.email, contact: "9999999999" },
        theme: { color: "#3399cc" },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error); toast.error("Payment Error");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    setCurrentStep(2); // Move to payment step
    toast.success('Address Saved');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#e8e4dc', paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Step Indicator */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>
          {[ { num: 1, label: 'Shipping' }, { num: 2, label: 'Payment' } ].map((step, index) => (
            <React.Fragment key={step.num}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1 }}>
                <div style={{
                  width: '48px', height: '48px', borderRadius: '50%',
                  background: currentStep >= step.num ? '#1a3a2e' : '#fff',
                  color: currentStep >= step.num ? '#fff' : '#999',
                  border: `2px solid ${currentStep >= step.num ? '#1a3a2e' : '#d4d0c8'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '600'
                }}>
                  {step.num}
                </div>
                <span style={{ marginTop: '0.5rem', fontSize: '0.875rem', fontWeight: '500' }}>{step.label}</span>
              </div>
              {index < 1 && (
                <div style={{
                  flex: 1, height: '2px', background: currentStep > 1 ? '#1a3a2e' : '#d4d0c8',
                  alignSelf: 'center', margin: '0 1rem', maxWidth: '150px'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Form - Glass Card */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)',
            borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.8)'
          }}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-2 text-primary-600" /> Shipping Details
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
               <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" placeholder="Address" required />
               <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" required />
               <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="input-field" placeholder="Postal Code" required />
               <input type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" placeholder="Country" required />
               <button type="submit" className="btn-secondary w-full">Save Address</button>
            </form>
          </div>

          {/* Order Summary - Glass Card */}
          <div style={{
             background: 'rgba(255, 255, 255, 0.85)', backdropFilter: 'blur(20px)',
             borderRadius: '24px', padding: '2rem', border: '1px solid rgba(255,255,255,0.8)'
          }}>
            <h2 className="text-xl font-semibold mb-6 flex items-center">
               <FaCreditCard className="mr-2 text-primary-600" /> Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between border-b pb-2">
                   <span>{item.name} (x{item.qty})</span>
                   <span>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div className="border-t pt-4 font-bold text-lg flex justify-between">
                 <span>Total:</span>
                 <span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
              </div>
              <button 
                className={`w-full mt-4 py-3 rounded-xl font-bold ${currentStep === 1 ? 'bg-gray-300 cursor-not-allowed' : 'btn-primary'}`} 
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