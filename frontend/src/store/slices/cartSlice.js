import { createSlice } from '@reduxjs/toolkit';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal', total: 0 };

// Helper to calculate prices and save to localStorage
const updateCart = (state) => {
  // Calculate Item Price
  const itemsPrice = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  
  // Calculate Shipping (Example: ₹50 if order < ₹1000, else free)
  const shippingPrice = itemsPrice > 1000 ? 0 : 50;
  
  // Calculate Tax (18% GST)
  const taxPrice = Number((0.18 * itemsPrice).toFixed(2));
  
  // Grand Total
  state.total = (itemsPrice + shippingPrice + taxPrice).toFixed(2);
  
  // Save to local storage
  localStorage.setItem('cart', JSON.stringify(state));
  
  return state;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }
      
      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      return updateCart(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      return updateCart(state);
    },
  },
});

export const { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod, clearCart } = cartSlice.actions;
export default cartSlice.reducer;