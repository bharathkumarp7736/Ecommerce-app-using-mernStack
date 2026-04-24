import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';

const Profile = () => {
    const {user,isAuthenticated,loading}=useSelector((state)=>state.user);
    const navigate=useNavigate();
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated])
  return (
    <>
    <Navbar/>
    <div className='min-h-screen bg-blue-100 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24'>

        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
            <h2 className='mt-6 text-center text-3xl
             font-extrabold text-gray-700'>My Profile</h2>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-xl'>
            <div className='bg-blue-200 py-10 px-6 shadow-xl rounded-2xl sm:px-12 flex flex-col items-center border border-blue-500'>
                <div className=' w-36 h-36 mb-8 mt-2'>
                    <img title={user?.name} src={user?.avatar?.url} alt={user?.name} className='rounded-full w-full h-full object-cover border-4 border-blue-500 shadow-lg cursor-pointer'/>
                </div>
                <div className='w-full space-y-6'>
                    <div className='bg-blue-100 p-4 rounded-xl border border-blue-400'>
                        <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Full Name</h4>
                        <p className='text-xl font-bold text-gray-700 capitalize'>{user?.name}</p>
                    </div>
                    <div className='bg-blue-100 p-4 rounded-xl border border-blue-400'>
                        <h4 className='text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1'>Email Address</h4>
                        <p className='text-xl font-bold text-gray-700'>{user?.email}</p>
                    </div>
                </div>
                <div className='w-full mt-8 flex gap-4 flex-col sm:flex-row '>
                    <Link to='/profile/update' className='w-full flex justify-center py-3 px-4 font-bold text-gray-100 border border-transparent rounded-xl shadow-md shadow-blue-300 text-sm bg-blue-400 hover:blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all active:scale-[0.98]'>Edit Profile</Link>

                    <Link to='/password/update' className='w-full flex justify-center py-3 px-4 font-bold text-gray-100 border border-transparent rounded-xl shadow-md shadow-blue-300 text-sm bg-blue-400 hover:blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all active:scale-[0.98]'>Change Password</Link>
                </div>
            </div>
        </div>

    </div>
    </>
  )
}

export default Profile