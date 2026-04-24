import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Loader from './Loader'

const ProtectedRoute = ({element,adminOnly=false}) => {
    const {isAuthenticated,loading,user}=useSelector((state)=>state.user)
    if (loading){
        return <Loader/>
    }
    if(!isAuthenticated){
        return <Navigate to='/login'></Navigate>
    }
    if(adminOnly && user.role!='admin'){
        return <Navigate to='/'></Navigate>
    }
  return element;
}

export default ProtectedRoute