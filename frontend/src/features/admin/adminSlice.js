import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecommerce-app-using-mernstack.onrender.com";

/* ================= PRODUCTS ================= */
export const getAdminProducts = createAsyncThunk(
  "admin/getProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/admin/products`);
      return data.products;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ================= ORDERS ================= */
export const getAdminOrders = createAsyncThunk(
  "admin/getOrders",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/admin/orders`);
      return data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "admin/updateOrder",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API}/api/v1/admin/order/update/${id}`, {
        status,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "admin/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(`${API}/api/v1/admin/order/${id}`);
      return { id, message: data.message };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

/* ================= USERS ================= */
export const getAdminUsers = createAsyncThunk(
  "admin/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/admin/users`);
      return data.users;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message);
    }
  }
);

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    products: [],
    orders: [],
    users: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAdminProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(getAdminOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })

      .addCase(getAdminUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.orders = state.orders.filter(
          (o) => o._id !== action.payload.id
        );
      });
  },
});

export default adminSlice.reducer;