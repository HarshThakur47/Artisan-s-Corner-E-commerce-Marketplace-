import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../utils/config';
const API_URL = BASE_URL || 'http://localhost:5000/api';

const initialState = {
  orders: [],
  order: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create order
export const createOrder = createAsyncThunk('orders/create', async (orderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_URL}/orders`, orderData, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get user orders (My Orders)
export const getUserOrders = createAsyncThunk('orders/getUserOrders', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/orders/myorders`, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get ALL orders (Admin)
export const getOrders = createAsyncThunk('orders/getAll', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/orders`, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get order by ID
export const getOrderById = createAsyncThunk('orders/getById', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`${API_URL}/orders/${id}`, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update order to paid
export const updateOrderToPaid = createAsyncThunk('orders/updateToPaid', async ({ id, paymentResult }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/orders/${id}/pay`, paymentResult, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update order to delivered (Admin)
export const deliverOrder = createAsyncThunk('orders/deliver', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`${API_URL}/orders/${id}/deliver`, {}, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Create Razorpay order
export const createRazorpayOrder = createAsyncThunk('orders/createRazorpayOrder', async (orderData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_URL}/payment/create-order`, orderData, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Verify Razorpay payment
export const verifyRazorpayPayment = createAsyncThunk('orders/verifyPayment', async (paymentData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user?.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post(`${API_URL}/payment/verify`, paymentData, config);
    return response.data;
  } catch (error) {
    const message = error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state) => { state.isLoading = true; })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get User Orders
      .addCase(getUserOrders.pending, (state) => { state.isLoading = true; })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get ALL Orders (Admin)
      .addCase(getOrders.pending, (state) => { state.isLoading = true; })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Get Order By ID
      .addCase(getOrderById.pending, (state) => { state.isLoading = true; })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.order = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      // Deliver Order
      .addCase(deliverOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the specific order in the list without reloading
        const index = state.orders.findIndex(order => order._id === action.payload._id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      });
  },
});

export const { reset } = orderSlice.actions;
export default orderSlice.reducer;