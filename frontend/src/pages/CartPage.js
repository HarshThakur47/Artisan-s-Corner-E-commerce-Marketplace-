import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import { FaTrash, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const CartPage = () => {
  const dispatch = useDispatch();
  const { cartItems, total } = useSelector((state) => state.cart);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#e8e4dc',
      paddingTop: '100px',
      paddingBottom: '80px'
    }}>
      <div className="container max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 backdrop-blur rounded-2xl">
            <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
            <Link to="/products" className="btn-primary inline-flex items-center">
              <FaArrowLeft className="mr-2" /> Continue Shopping
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr',
            gap: '2rem'
          }}>
            {/* Items */}
            <div>
              {cartItems.map((item) => (
                <div key={item._id} style={{
                  background: '#fff', borderRadius: '16px', padding: '1.5rem', marginBottom: '1rem',
                  border: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: '1.5rem', alignItems: 'center'
                }}>
                  <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', borderRadius: '12px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 className="font-medium text-lg">{item.name}</h3>
                    <p className="text-primary-600 font-bold text-xl">₹{item.price}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, qty: item.qty - 1 }))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">-</button>
                      <span>{item.qty}</span>
                      <button onClick={() => dispatch(updateQuantity({ id: item._id, qty: item.qty + 1 }))} className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-gray-50">+</button>
                    </div>
                  </div>
                  <button onClick={() => dispatch(removeFromCart(item._id))} className="text-red-500 hover:bg-red-50 p-2 rounded-full">
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(20px) saturate(180%)',
              WebkitBackdropFilter: 'blur(20px) saturate(180%)',
              borderRadius: '24px', padding: '2rem',
              boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
              border: '1px solid rgba(255, 255, 255, 0.8)',
              height: 'fit-content', position: 'sticky', top: '100px'
            }}>
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{total}</span></div>
                <div className="flex justify-between text-gray-600"><span>Shipping</span><span>₹50</span></div>
                <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{(total * 0.18).toFixed(0)}</span></div>
                <div className="border-t pt-3 flex justify-between font-bold text-lg">
                  <span>Total</span><span>₹{(total + 50 + (total * 0.18)).toFixed(0)}</span>
                </div>
              </div>
              <Link to="/checkout" className="btn-primary w-full block text-center py-3 rounded-xl font-semibold">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;