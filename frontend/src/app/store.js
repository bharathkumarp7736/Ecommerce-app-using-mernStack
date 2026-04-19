import { configureStore } from "@reduxjs/toolkit";
import Product from "../Components/Product";
import productReducer from '../features/products/productSlice'; 
import userReducer from '../features/products/user/userSlice';
export const store=configureStore({
    reducer:{
        product:productReducer,
        user:userReducer,
    },
});