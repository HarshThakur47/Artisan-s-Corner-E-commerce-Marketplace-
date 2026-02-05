import { createSlice } from '@reduxjs/toolkit';

// Get cart from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems: cartItems,
  total: cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
  shippingAddress: JSON.parse(localStorage.getItem('shippingAddress')) || {},
  paymentMethod: JSON.parse(localStorage.getItem('paymentMethod')) || 'Razorpay',
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === existItem._id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        state.cartItems = [...state.cartItems, { ...item, qty: 1 }];
      }

      state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
      state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    updateQuantity: (state, action) => {
      const { id, qty } = action.payload;
      state.cartItems = state.cartItems.map((item) =>
        item._id === id ? { ...item, qty: parseInt(qty) } : item
      );
      state.total = state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.total = 0;
      localStorage.removeItem('cartItems');
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      localStorage.setItem('paymentMethod', JSON.stringify(action.payload));
    },
    clearCart: (state) => {
    state.cartItems = [];
    localStorage.setItem('cartItems', JSON.stringify([]));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  saveShippingAddress,
  savePaymentMethod,
} = cartSlice.actions;

export default cartSlice.reducer;
