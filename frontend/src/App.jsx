import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Register from './user/Register';
import ProductDetails from './pages/ProductDetails';
import Products from './pages/Products';
import Login from './user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from './features/products/user/userSlice';
import Profile from './user/Profile';
import UpdateProfile from './user/UpdateProfile';
const App = () => {

  const{isAuthenticated,user}=useSelector(state=>state.user);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(isAuthenticated){
      dispatch(loadUser());
    }
  },[dispatch])
// console.log(isAuthenticated,user);

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/product/:id" element={<ProductDetails/>}></Route>
      <Route path="/products" element={<Products/>}></Route>
      <Route path="/about-us" element={<About/>}></Route>
      <Route path="/contact-us" element={<Contact/>}></Route>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/profile" element={<Profile/>}></Route>
      <Route path="/profile/update" element={<UpdateProfile/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App