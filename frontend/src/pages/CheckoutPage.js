import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress, clearCart } from '../store/slices/cartSlice';
import { createOrder } from '../store/slices/orderSlice';
import { toast } from 'react-toastify';
import { FaMapMarkerAlt, FaCreditCard, FaCity } from 'react-icons/fa';
import axios from 'axios';
import { BASE_URL } from '../utils/config'; 
import { loadRazorpayScript } from '../utils/razorpay';

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, shippingAddress } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [currentStep, setCurrentStep] = useState(1);

  // 1. Recalculate costs locally to ensure Math is correct (Numbers, not Strings)
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  const taxPrice = itemsPrice * 0.18;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const [formData, setFormData] = useState({
    address: shippingAddress.address || '',
    city: shippingAddress.city || '',
    postalCode: shippingAddress.postalCode || '',
    country: shippingAddress.country || 'India',
  });

  const handlePayment = async () => {
    const res = await loadRazorpayScript();
    if (!res) { toast.error('Razorpay SDK failed'); return; }

    try {
      const { data: key } = await axios.get(`${BASE_URL}/orders/config/razorpay`);

      // Create Order on Server
      const { data: order } = await axios.post(`${BASE_URL}/orders/razorpay`, { 
        amount: Math.round(totalPrice) // Use the numeric totalPrice
      });

      const options = {
        key: key, 
        amount: order.amount, 
        currency: order.currency,
        name: "Artisan's Corner", 
        description: "Handmade Order",
        order_id: order.id,
        handler: async function (response) {
          const formattedOrderItems = cartItems.map((item) => ({
            name: item.name, qty: item.qty, image: item.image, price: item.price, product: item._id,
          }));
          
          const orderData = {
            orderItems: formattedOrderItems, 
            shippingAddress: formData, 
            paymentMethod: "Razorpay",
            itemsPrice: Number(itemsPrice.toFixed(2)), 
            taxPrice: Number(taxPrice.toFixed(2)),
            shippingPrice: Number(shippingPrice.toFixed(2)), 
            totalPrice: Number(totalPrice.toFixed(2)),
            paymentResult: { 
              id: response.razorpay_payment_id, 
              status: "success", 
              update_time: String(Date.now()), 
              email_address: user?.email 
            },
          };

          const result = await dispatch(createOrder(orderData));
          if (createOrder.fulfilled.match(result)) {
             dispatch(clearCart());
             navigate(`/order/${result.payload._id}`);
          } else {
             toast.error("Order save failed. Please contact support.");
          }
        },
        prefill: { name: user?.name, email: user?.email },
        theme: { color: "#3399cc" },
      };
      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error(error); 
      toast.error("Payment initiation failed");
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
    <div className="page-wrapper">
      <div className="container">
        
        {/* Step Indicator */}
        <div className="steps-container">
           <div className={`step-circle ${currentStep >= 1 ? 'active' : ''}`}>1</div>
           <div className={`step-line ${currentStep >= 2 ? 'active' : ''}`}></div>
           <div className={`step-circle ${currentStep >= 2 ? 'active' : ''}`}>2</div>
        </div>

        <div className="grid-2">
          {/* Column 1: Shipping Form */}
          <div className="glass-card">
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Shipping Details</h2>
            <form onSubmit={handleSubmit}>
               <div className="form-group">
                 <label className="form-label">Address</label>
                 <div className="input-wrapper">
                   <FaMapMarkerAlt className="input-icon"/>
                   <input type="text" name="address" value={formData.address} onChange={handleChange} className="input-field" required />
                 </div>
               </div>
               <div className="grid-2" style={{ gap: '1rem', marginBottom: '1.5rem' }}>
                 <div className="input-wrapper">
                   <FaCity className="input-icon"/>
                   <input type="text" name="city" value={formData.city} onChange={handleChange} className="input-field" placeholder="City" required />
                 </div>
                 <div className="input-wrapper">
                   <FaMapMarkerAlt className="input-icon"/>
                   <input type="text" name="postalCode" value={formData.postalCode} onChange={handleChange} className="input-field" placeholder="Postal Code" required />
                 </div>
               </div>
               <div className="form-group">
                 <label className="form-label">Country</label>
                 <input type="text" name="country" value={formData.country} onChange={handleChange} className="input-field" required />
               </div>
               <button type="submit" className="btn-primary" style={{ background: 'var(--secondary)' }}>Save Address</button>
            </form>
          </div>

          {/* Column 2: Order Summary */}
          <div className="glass-card" style={{ height: 'fit-content' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Order Summary</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {cartItems.map(item => (
                <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text)' }}>
                   <span>{item.name} x {item.qty}</span>
                   <span style={{ fontWeight: '600' }}>₹{item.price * item.qty}</span>
                </div>
              ))}
              
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '1rem', marginTop: '1rem' }}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <span>Subtotal</span>
                   <span>₹{itemsPrice.toFixed(2)}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <span>Shipping</span>
                   <span>₹{shippingPrice.toFixed(2)}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                   <span>Tax (18%)</span>
                   <span>₹{taxPrice.toFixed(2)}</span>
                 </div>
                 <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: '700', marginTop: '1rem', borderTop: '1px dashed var(--border)', paddingTop: '1rem' }}>
                   <span>Total</span>
                   <span>₹{totalPrice.toFixed(2)}</span>
                 </div>
              </div>

              <button 
                onClick={handlePayment}
                disabled={currentStep === 1}
                className="btn-primary"
                style={{ marginTop: '1.5rem' }}
              >
                {currentStep === 1 ? 'Enter Address to Proceed' : 'Pay & Place Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;