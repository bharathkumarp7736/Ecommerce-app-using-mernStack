import React, { use, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {useDispatch,useSelector} from "react-redux"
import{login, removeErrors, removeSuccess} from "../features/products/user/userSlice"
import { toast } from "react-hot-toast";

const Login = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")

  const{error,loading,success,isAuthenticated}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  //for empty login fields
const loginNow = (e) => {
  e.preventDefault();

  if (!email || !password) {
    toast.error("Please fill all the fields", {
      position: "top-center",
      autoClose: 3000,
    });
    return;
  }

  dispatch(login({ email, password }));
};
  

   useEffect(()=>{
    if(error){
      toast.error(error,{position:"top-center",autoClose:3000});
      dispatch(removeErrors());
    }
  },[error, dispatch]);

  useEffect(()=>{
    if(success){
      toast.success("Login successfully.",{position:"top-center",autoClose:3000});
      dispatch(removeSuccess());
      navigate("/");
    }
  },[success, dispatch,navigate]);


  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">
        <form onSubmit={loginNow} className="space-y-6">
          <div className="text-center">
            <h2 className="font-bold text-gray-800 text-3xl">Welcome Back</h2>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to continue
            </p>
          </div>
          
          <div className="space-y-2">
            <label
              htmlFor=""
              className="text-sm font-medium text-gray-700 ml-1 block"
            >
              Email
            </label>
            <input
              placeholder="example@gmail.com"
              type="email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor=""
              className="text-sm font-medium text-gray-700 ml-1 block"
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              type="password"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-500 text-gray-100  font-semibold py-3 rounded-xl shadow-lg shadow-blue-500 transition-all active:scale-[0.98] cursor-pointer">
            Sign In
          </button>
          <p className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login