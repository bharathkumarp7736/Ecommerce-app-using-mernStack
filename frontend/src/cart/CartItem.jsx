import { Minus, Plus, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { addToCart, removeErrors, removeItemFromCart } from '../features/products/cart/cartSlice';

const CartItem = ({ item }) => {
    const [quantity,setQuantity]=useState(item.quantity);
    const dispatch =useDispatch()

    //increase quantity
    const increaseQuantity=()=>{
        if (item.stock <= quantity) {
      toast.error("quantity cannot be less than stock!");
      dispatch(removeErrors());
      return;
    }
    const newQty=quantity+1;
    setQuantity(newQty);
     dispatch(addToCart({id:item.product,quantity:newQty}))
    };

//decrease quantity
    const decreaseQuantity=()=>{
        if (quantity <= 1) {
      toast.error("quantity cannot be less than 1");
      dispatch(removeErrors());
      return;
    }
    const newQty=quantity-1;
    setQuantity(newQty);
    dispatch(addToCart({id:item.product,quantity:newQty}))
    };

  return (
    <div key={item._id} className='flex item-center gap-4 rounded-xl border border-blue-500 bg-blue-200 p-4'>
        <img src={item?.image} alt={item?.name} className='rounded-xl w-20 h-20' />
        <div className='flex-1'>
            <h3 className='font-bold text-gray-700'>{item?.name}</h3>
            <p className='text-sm text-gray-500 truncate max-w-50'>{item?.description}</p>
            <p className='font-bold mt-2 text-amber-600'>Rs. {item.price.toFixed(2)}</p>
            <p className='font-bold text-sm text-gray-500'>Total: ₹ {(item?.price * item?.quantity).toFixed(2)}</p>
        </div>
        <div className='flex  items-center gap-2'>
            <button onClick={decreaseQuantity} className='w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors'><Minus className='text-red-800'/></button>
            <span className='w-8 text-center font-bold'>{item?.quantity}</span>
            <button onClick={increaseQuantity} className='w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors'><Plus className='text-green-800'/></button>

        </div>
        <button onClick={()=>dispatch(removeItemFromCart(item.product))} className='text-red-500 hover:text-red-700'><Trash2/></button>
    </div>
  )
}



export default CartItem