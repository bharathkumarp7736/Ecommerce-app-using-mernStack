import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import ProtectedRoute from './Components/ProtectedRoute';
import UpdatePassword from './user/UpdatePassword';
import ForgotPassword from './user/ForgotPassword';
import ResetPassword from './user/ResetPassword';
import Cart from './cart/Cart';
import ShippingCartItem from './cart/ShippingCartItem';
import ConfirmOrder from './cart/ConfirmOrder';
import Payment from './cart/Payment';
import Success from './cart/Success';
import MyOrders from "./pages/MyOrders";
import AdminDashboard from './pages/AdminDashboard ';


const App = () => {

  const { isAuthenticated, user } = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  return (
    <BrowserRouter>
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/reset/:token" element={<ResetPassword />} />

        {/* USER PROTECTED */}
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/profile/update" element={<ProtectedRoute element={<UpdateProfile />} />} />
        <Route path="/password/update" element={<ProtectedRoute element={<UpdatePassword />} />} />

        {/* CART FLOW */}
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ShippingCartItem />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<Success />} />
        <Route path="/orders" element={<MyOrders />} />

        {/*ADMIN PROTECTED ROUTE */}
        <Route
          path="/admin/orders"
          element={
            isAuthenticated && user?.role === "admin"
              ? <AdminDashboard />
              : <Navigate to="/" />
          }
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;