import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../store/slices/cartSlice';
import { FaTrash, FaArrowRight } from 'react-icons/fa';

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Handle undefined state
  const cart = useSelector((state) => state.cart) || {};
  const { cartItems = [] } = cart; 

  const itemsSubtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const totalItemsCount = cartItems.reduce((acc, item) => acc + item.qty, 0);

  const handleCheckout = () => navigate('/login?redirect=/checkout');

  return (
    <div className="page-wrapper">
      <div className="container">
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '4rem' }}>
            <h2>Your cart is empty</h2>
            <Link to="/products" className="btn-primary" style={{ maxWidth: '200px', margin: '2rem auto' }}>Start Shopping</Link>
          </div>
        ) : (
          <div className="grid-2-1" style={{ gap: '2rem', display: 'grid' }}>
            
            {/* Cart Items List */}
            <div className="glass-card">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-img" />
                  <div style={{ flex: 1 }}>
                    <Link to={`/product/${item._id}`} style={{ fontWeight: '600', fontSize: '1.1rem', textDecoration: 'none' }}>{item.name}</Link>
                    <p style={{ color: 'var(--primary)', fontWeight: 'bold' }}>₹{item.price}</p>
                  </div>
                  
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <button className="btn-outline" style={{ padding: '4px 10px' }} onClick={() => dispatch(addToCart({ ...item, qty: Math.max(1, item.qty - 1) }))}>-</button>
                    <span style={{ fontWeight: '600' }}>{item.qty}</span>
                    <button className="btn-outline" style={{ padding: '4px 10px' }} onClick={() => dispatch(addToCart({ ...item, qty: Math.min(item.countInStock, item.qty + 1) }))}>+</button>
                  </div>

                  <button onClick={() => dispatch(removeFromCart(item._id))} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}>
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="glass-card" style={{ height: 'fit-content' }}>
              <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                Subtotal ({totalItemsCount}) items
              </h2>
              <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                ₹{itemsSubtotal.toFixed(2)}
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
                Taxes and shipping calculated at checkout
              </p>
              <button onClick={handleCheckout} className="btn-primary">
                Proceed to Checkout <FaArrowRight style={{ marginLeft: '8px' }} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;