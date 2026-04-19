import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


// register api
export const register=createAsyncThunk("user/register",async(userData,{rejectWithValue})=>{
    try{
        const config={
            headers:{
                "Content-Type":"multipart/form-data",
            },
        }
        const{data}=await axios.post("/api/v1/register",userData,config)
        return data;
    }
    catch(error){
        return rejectWithValue(error.response?.data || "Registration failed, Please try again later.")
    }
})

//get profile
export const loadUser=createAsyncThunk("user/loadUser",async(_,{
    rejectWithValue
})=>{
    try{
        const {data}=await axios.get("/api/v1/profile");
        return data;

    }
    catch(error){
        return rejectWithValue(error.response?.data || "Failed to load user profile")
    }
})

//login api

export const login=createAsyncThunk("user/login",async({email,password},{rejectWithValue})=>{
    try{
        const config={
            headers:{
                "Content-Type":"application/json",
            },
        }
        const{data}=await axios.post("/api/v1/login",{email,password},config)
        console.log('login data ',data);
        
        return data;
    }
    catch (error){
        return rejectWithValue(error.response?.data || "Login failed, Please try again later.")
    }
})

 //logout api
    export const logout=createAsyncThunk("user/logout",async(_,{rejectWithValue})=>{
        try{
            const {data}=await axios.get("/api/v1/logout");
            return data;
        }
        catch(error){
            return rejectWithValue(error.response?.data || "Failed to logout")
        }
    });

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:localStorage.getItem('user')?JSON.parse(localStorage.getItem('user')):null,
        loading:false,
        error:null,
        success:false,
        isAuthenticated:localStorage.getItem('user')?true:false,
        message:null,
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeSuccess:(state)=>{
            state.success=false;
        }
    },
    extraReducers: (builder) => {
  builder
    .addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.user = action.payload?.user || null;
      state.isAuthenticated = Boolean(action.payload?.user);

      // store in localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
    })
    .addCase(register.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload || "Registration failed, Please try again later.";
      state.isAuthenticated = false;
      state.user = null;
    });

    //login user
     builder
    .addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload.success;
      state.user = action.payload?.user || null;
      state.isAuthenticated = Boolean(action.payload?.user);

      // store in localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
    })
    .addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.payload || "Login failed, Please try again later.";
      state.isAuthenticated = false;
      state.user = null;
    });

   


    //loading user
    builder
    .addCase(loadUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(loadUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=action.payload?.user || null;
        state.isAuthenticated =Boolean(action.payload?.user)
        // store in localStorage
      localStorage.setItem('user', JSON.stringify(state.user));
      localStorage.setItem('isAuthenticated', JSON.stringify(state.isAuthenticated));
    })
    .addCase(loadUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to load user profile"
        state.user=null;
        state.isAuthenticated=false;
        if(action.payload?.statusCode==404){
            state.user=null;
            state.isAuthenticated=false;
            localStorage.removeItem("user");
            localStorage.removeItem("isAuthenticated");
        
        }
    });

    //logout user
    builder
    .addCase(logout.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
    .addCase(logout.fulfilled,(state,action)=>{
        state.loading=false;
        state.user=null;
        state.error=null;
        state.isAuthenticated=false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
    })
    .addCase(logout.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to logout";
    });

}
})
export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;