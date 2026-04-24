import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { removeErrors, removeSuccess, resetPassword } from "../features/products/user/userSlice";

const ResetPassword = () => {
  const{error,loading,success,message}=useSelector((state)=>state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {token}=useParams();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(()=>{
        if(error){
            toast.error(error || 'failed to reset password! please try again');
            dispatch(removeErrors())
        }
        if(success){
            toast.success('password reset successfully');
            dispatch(removeSuccess());
            navigate('/login');
        }
        
    },[dispatch,error,success,navigate])


const resetPasswordSubmit = (e) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    toast.error('password and confirm password should be same');
    return;
  }

  const data = {
    password,
    confirmPassword,
  };

  dispatch(resetPassword({ token, userData: data }));
};
  
  return (
    <>
      <Navbar />
      <div className="bg-blue-200 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">
          <form className="space-y-6" onSubmit={resetPasswordSubmit}>
            <div className="text-center">
              <h2 className="font-bold text-gray-800 text-3xl">
                Reset Password
              </h2>
            </div>
            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-700 ml-1 block"
              >
                New Password
              </label>
              <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
                type="password"
                required
                placeholder="Enter new password"
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
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
                type="password"
                required
                placeholder="Enter confirm password"
                className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <button className="w-full bg-blue-600 hover:bg-blue-500 text-gray-100  font-semibold py-3 rounded-xl shadow-lg shadow-blue-500 transition-all active:scale-[0.98] cursor-pointer">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
