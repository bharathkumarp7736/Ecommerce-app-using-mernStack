import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://ecommerce-app-using-mernstack.onrender.com";

export const addToCart = createAsyncThunk(
  "/cart/addToCart",
  async ({ id, quantity }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API}/api/v1/product/${id}`);

      const product = data.product;

      return {
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image?.[0]?.url || "",
        stock: product.stock,
        quantity,
      };
    } catch (error) {
      console.log("ERROR:", error);
      return rejectWithValue(
        error.response?.data?.message || "Error adding to cart",
      );
    }
  },
);

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  loading: false,
  error: null,
  success: false,
  message: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeMessage: (state) => {
      state.message = null;
      state.success = false;
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartItems");
    },
    removeItemFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.product !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const item = action.payload;
        const existingItem = state.cartItems.find(
          (i) => i.product === item.product,
        );
        if (existingItem) {
          existingItem.quantity = item.quantity;
          state.message = `Updated ${action.payload.name} in quantity in cart!`;
        } else {
          state.cartItems.push(item);
          state.message = `${action.payload.name} added to cart successfully!`;
        }
        state.loading = false;
        state.error = null;
        state.success = true;
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "something went wrong while adding to cart   ";
      });
  },
});

export const { removeErrors, removeMessage, clearCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;