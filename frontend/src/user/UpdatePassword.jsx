import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from "react-redux";
import { removeSuccess, updatePassword } from "../features/products/user/userSlice";
import { removeErrors } from "../features/products/productSlice";
const UpdatePassword = () => {
    const{error,success,loading}=useSelector((state)=>state.user);
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const dispatch =useDispatch()
    const navigate=useNavigate()
    useEffect(()=>{
        if(error){
            toast.error(error || 'failed to update password! try again');
            dispatch(removeErrors())
        }
        if(success){
            toast.success('password updated successfully');
            dispatch(removeSuccess());
            navigate('/profile')
        }
        
    },[dispatch,error,success])

    const updatePasswordSubmit=(e)=>{
        e.preventDefault();
        if(newPassword!==confirmPassword){
            toast.error('New password and Confirm password does not match')
        }
        dispatch(updatePassword({oldPassword,newPassword,confirmPassword}))

    }
  return (
    <>
      <Navbar />
      <div className="bg-blue-200 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">
          <form className="space-y-6" onSubmit={updatePasswordSubmit}>
            <div className="text-center">
              <h2 className="font-bold text-gray-800 text-3xl">
                Update Password
              </h2>
            </div>

            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-700 ml-1 block"
              >
                Old Password
              </label>
              <input 
              value={oldPassword}
              onChange={(e)=>setOldPassword(e.target.value)}
              type="password" required 
              placeholder="Enter old password"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-700 ml-1 block"
              >
                New Password
              </label>
              <input 
              value={newPassword}
               onChange={(e)=>setNewPassword(e.target.value)}
              type="password" required 
              placeholder="Enter new password"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-700 ml-1 block"
              >
                Confirm Password
              </label>
              <input 
              value={confirmPassword}
               onChange={(e)=>setConfirmPassword(e.target.value)}
              type="password" required 
              placeholder="Enter confirm password"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-gray-100  font-semibold py-3 rounded-xl shadow-lg shadow-blue-500 transition-all active:scale-[0.98] cursor-pointer">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
