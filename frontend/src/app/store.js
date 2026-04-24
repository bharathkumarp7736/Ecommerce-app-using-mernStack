import { configureStore } from "@reduxjs/toolkit";
import Product from "../Components/Product";
import productReducer from '../features/products/productSlice'; 
import userReducer from '../features/products/user/userSlice';
import cartReducer from '../features/products/cart/cartSlice';
import orderReducer from "../features/products/order/orderSlice";
import adminReducer from "../features/admin/adminSlice";
export const store=configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
        cart:cartReducer,
        order:orderReducer,
        admin: adminReducer,
    },
});