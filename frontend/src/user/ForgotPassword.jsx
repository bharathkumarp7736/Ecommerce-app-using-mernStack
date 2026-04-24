import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import PageTitle from '../Components/PageTitle'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword, removeErrors, removeSuccess } from '../features/products/user/userSlice'
import toast from 'react-hot-toast'
const ForgotPassword = () => {
    const {error,success,loading,message}=useSelector((state)=>state.user);
    const[email,setEmail]=useState('')
    const dispatch=useDispatch();
useEffect(()=>{
        if(error){
            toast.error(error || 'failed to send forgot link! please try again');
            dispatch(removeErrors())
        }
        if(success){
            toast.success('forgot link sent successfully check your email');
            dispatch(removeSuccess());
            
        }
        
    },[dispatch,error,success])

    const forgotPasswordSubmit=(e)=>{
        e.preventDefault();
        dispatch(forgotPassword({email}))
        setEmail('')

    }

  return (
    <>
    <Navbar/>
    <PageTitle title="Forgot your password"/>
      <div className="bg-blue-200 flex items-center justify-center min-h-screen">
        <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">
          <form className="space-y-6" onSubmit={forgotPasswordSubmit}>
            <div className="text-center">
              <h2 className="font-bold text-gray-800 text-3xl">
                Forgot Password
              </h2>
            </div>

            <div className="space-y-2">
              <label
                htmlFor=""
                className="text-sm font-medium text-gray-700 ml-1 block"
              >
                Email ID
              </label>
              <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type='email' required
              placeholder="example@gmail.com"
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all" />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-500 text-gray-100  font-semibold py-3 rounded-xl shadow-lg shadow-blue-500 transition-all active:scale-[0.98] cursor-pointer">
             Send reset link
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword