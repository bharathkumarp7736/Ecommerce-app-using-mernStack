import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PageTitle from '../Components/PageTitle';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import CartItem from './cartItem';
import { Trash2 } from 'lucide-react';
import { clearCart } from '../features/products/cart/cartSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const Cart = () => {
    
    const {success,loading,error,message,cartItems}=useSelector((state)=>state.cart);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const subTotal=cartItems.reduce((acc,item)=>acc+item.price*item.quantity,0);
    const tax=subTotal*0.18;
    const shippingCharges=cartItems.length===0?0:(subTotal>399?0:50);
    const total=subTotal+tax+shippingCharges;

    const checkoutHandler = () => {
  if (cartItems.length === 0) {
    toast.error('your cart is empty!')
    return;}
  navigate("/shipping");
};
  return (
    <>
    <PageTitle title='Your Cart'/>
    <Navbar/>
    <main className='pt-20 pb-10 min-h-screen bg-blue-200'>
        <div className='container mx-auto px-4 '>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                <div className='lg:col-span-2'>
                    {/* cart details */}
                    <div className='bg-blue-300 rounded-2xl shadow-lg p-6'>
                        <h2 className='text-xl font-bold text-gray-700 mb-6 flex justify-between'>Your Cart
                            <button onClick={()=>dispatch(clearCart())} className='text-red-500 hover:text-red-700 flex items-center text-sm '><Trash2/> Clear Cart</button>
                        </h2>
                        <div className='space-y-4'>
                            {cartItems.length===0?(
                                <p className='text-gray-500 text-center py-12'>Your cart is empty</p>
                            ):(
                                cartItems.map((item)=><CartItem item={item} key={item.product}/>)
                            )}
                        </div>
                    </div>

                </div>
                <div className='lg:col-span-1'>
                    {/* amount detaild */}
                    <div className='bg-blue-300 rounded-2xl shadow-lg p-6 sticky top-24'>
                        <h2 className='text-xl font-bold text-gray-700 mb-6'>Order Summary</h2>
                        <div className='space-y-4'>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-semibold'>SubTotal</span>
                                <span className='font-bold'>₹ {subTotal.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-semibold'>Shipping</span>
                                <span className='font-bold'>₹ {shippingCharges.toFixed(2)}</span>
                            </div>
                            <div className='flex justify-between'>
                                <span className='text-gray-600 font-semibold'>Tax</span>
                                <span className='font-bold'>₹ {tax.toFixed(2)}</span>
                            </div>
                            <div className='border-t border-gray-50 pt-4'>
                            <div className='flex justify-between'>
                                <span className=' font-bold'>Total</span>
                                <span className='font-bold text-amber-600'>₹ {total.toFixed(2)}</span>
                            </div>
                            </div>

                        </div>
                    <button 
                    onClick={checkoutHandler}
                    className='bg-blue-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-blue-400 transition w-full mt-4 cursor-pointer' >Proceed to Checkout</button>
                    </div>
                </div>
            </div>
        </div>


    </main>


    <Footer/>
    </>
  )
}

export default Cart