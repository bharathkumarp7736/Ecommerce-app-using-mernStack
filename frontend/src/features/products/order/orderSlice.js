import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecommerce-app-using-mernstack.onrender.com";

// GET ORDERS
export const getMyOrders = createAsyncThunk(
  "order/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/orders/user`);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

// CANCEL ORDER
export const cancelOrder = createAsyncThunk(
  "order/cancelOrder",
  async (id, { rejectWithValue }) => {
    try {
      await axios.put(`${API}/api/v1/order/cancel/${id}`, {
        status: "Cancelled",
      });
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(cancelOrder.fulfilled, (state, action) => {
        const order = state.orders.find(
          (o) => o._id === action.payload
        );
        if (order) {
          order.orderStatus = "Cancelled";
        }
      });
  },
});

export default orderSlice.reducer;