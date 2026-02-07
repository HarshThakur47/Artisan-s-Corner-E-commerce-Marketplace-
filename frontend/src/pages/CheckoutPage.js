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
import { useTheme } from '../context/ThemeContext';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, total, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { colors } = useTheme();
  
  const [currentStep, setCurrentStep] = useState(1);
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
      const taxAmount = total * 0.18;
      const shippingAmount = 50;
      const finalTotal = total + shippingAmount + taxAmount;

      const { data: order } = await axios.post(`${BASE_URL}/orders/razorpay`, { amount: Math.round(finalTotal) });

      const options = {
        key: key, 
        amount: order.amount, 
        currency: order.currency,
        name: "Artisan's Corner", 
        description: "Handmade with Love",
        order_id: order.id,
        handler: async function (response) {
          toast.success("Payment Verified! Saving Order...");
          
          const formattedOrderItems = cartItems.map((item) => ({
            name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id,
          }));
          
          const orderData = {
            orderItems: formattedOrderItems,
            shippingAddress: formData, 
            paymentMethod: "Razorpay",
            itemsPrice: Number(total),
            taxPrice: Number(taxAmount.toFixed(2)),
            shippingPrice: Number(shippingAmount),
            totalPrice: Number(finalTotal.toFixed(2)),
            paymentResult: { 
              id: response.razorpay_payment_id, status: "success", 
              update_time: String(Date.now()), email_address: user?.email 
            },
          };

          const result = await dispatch(createOrder(orderData));
          if (createOrder.fulfilled.match(result)) {
             dispatch(clearCart());
             navigate(`/order/${result.payload._id}`);
          } else {
             toast.error("Database Save Failed! Check Console.");
          }
        },
        prefill: { name: user?.name, email: user?.email, contact: "9999999999" },
        theme: { color: colors.primary },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error); toast.error("Payment Initiation Failed");
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formData));
    setCurrentStep(2);
    toast.success('Address Saved');
  };

  const inputStyle = {
    width: '100%', padding: '12px 16px', borderRadius: '10px',
    border: `2px solid ${colors.border}`, background: colors.surface,
    color: colors.text, fontSize: '15px', outline: 'none', transition: 'all 0.3s ease'
  };

  return (
    <div style={{ minHeight: '100vh', background: colors.background, paddingTop: '100px', paddingBottom: '80px' }}>
      <div className="container mx-auto px-4 max-w-7xl">
        
        {/* Step Indicator */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem',
          padding: '2rem', background: colors.surface, borderRadius: '16px', boxShadow: `0 4px 12px ${colors.shadow}`
        }}>
          {[
            { num: 1, label: 'Shipping', icon: '📦' },
            { num: 2, label: 'Payment', icon: '💳' }
          ].map((step, index) => (
            <React.Fragment key={step.num}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '50px', height: '50px', borderRadius: '50%',
                  background: currentStep >= step.num ? `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})` : colors.surfaceLight,
                  border: `2px solid ${currentStep >= step.num ? colors.primary : colors.border}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: currentStep >= step.num ? '#fff' : colors.textSecondary, fontSize: '1.25rem'
                }}>
                  {step.icon}
                </div>
                <span style={{ marginTop: '0.5rem', fontWeight: '600', color: currentStep >= step.num ? colors.text : colors.textSecondary }}>{step.label}</span>
              </div>
              {index < 1 && (
                <div style={{
                  flex: 1, height: '3px', background: currentStep > step.num ? colors.primary : colors.border,
                  margin: '0 1rem', maxWidth: '150px'
                }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          {/* Shipping Form */}
          <div style={{ background: colors.surface, padding: '2rem', borderRadius: '24px', border: `1px solid ${colors.border}` }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.text }}>
              <FaMapMarkerAlt color={colors.primary} /> Shipping
            </h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <input type="text" name="address" value={formData.address} onChange={handleChange} style={inputStyle} placeholder="Address" required />
               <input type="text" name="city" value={formData.city} onChange={handleChange} style={inputStyle} placeholder="City" required />
               <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} style={inputStyle} placeholder="Postal Code" required />
               <input type="text" name="country" value={formData.country} onChange={handleChange} style={inputStyle} placeholder="Country" required />
               <button type="submit" style={{
                 padding: '12px', background: colors.surfaceLight, color: colors.text, border: `1px solid ${colors.border}`,
                 borderRadius: '10px', fontWeight: '600', cursor: 'pointer', marginTop: '1rem'
               }}>Save Address</button>
            </form>
          </div>

          {/* Summary */}
          <div style={{ background: colors.surface, padding: '2rem', borderRadius: '24px', border: `1px solid ${colors.border}`, height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: colors.text }}>
              <FaCreditCard color={colors.primary} /> Summary
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', color: colors.text }}>
                   <span>{item.name} x {item.qty}</span>
                   <span style={{ fontWeight: '600' }}>₹{item.price * item.qty}</span>
                </div>
              ))}
              <div style={{ borderTop: `1px solid ${colors.divider}`, paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', fontWeight: 'bold', color: colors.text }}>
                 <span>Total</span>
                 <span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
              </div>
              <button 
                onClick={handlePayment}
                disabled={currentStep === 1}
                style={{
                  width: '100%', padding: '16px', marginTop: '1rem',
                  background: currentStep === 1 ? colors.border : `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                  color: currentStep === 1 ? colors.textSecondary : '#fff',
                  border: 'none', borderRadius: '12px', fontSize: '16px', fontWeight: '600',
                  cursor: currentStep === 1 ? 'not-allowed' : 'pointer', transition: 'all 0.3s'
                }}
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