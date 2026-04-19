import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, ShoppingBag, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/products/user/userSlice";
const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  //profile dropdown
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  {
    /* search function */
  }
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };

  //logout function
  const handleLogout=()=>{
    dispatch(logout()); 
  }

  return (
    <nav className="sticky top-0 w-full bg-blue-200 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* logo */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-500"
        >
          <ShoppingBag />
          <span>Shopping Hub</span>
        </Link>

        {/* desktop link */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            to="/"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Home
          </Link>
          <Link
            to="/products"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Products
          </Link>
          <Link
            to="/about-us"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            About Us
          </Link>
          <Link
            to="/Contact-us"
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Contact us
          </Link>
        </div>

        {/* right section */}
        <div className="flex items-center gap-4">
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center border border-blue-500 rounded overflow-hidden"
          >
            <input
              type="text"
              placeholder="Search Product"
              className="px-3 py-2 text-sm w-40 focus:outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="px-3 text-gray-700 hover:text-blue-500 transition cursor-pointer"
            >
              <Search size={18} />
            </button>
          </form>

          {/* cart */}
          <Link
            to="/"
            className="relative text-gray-700 hover:text-blue-500 transition cursor-pointer"
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-blue-500 text-gray-300 text-xs font-semibold min-w-5 h-5 rounded-full flex items-center justify-center">
              7
            </span>
          </Link>

          {/* registeration */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex items-center gap-4">
              <Link to='/login' className="text-gray-700 hover:text-blue-500 transition font-semibold">Sign In</Link>
              <Link
                to="/register"
                className="hidden sm:flex gap-2 items-center bg-blue-500 text-gray-300 px-4 py-2 rounded-lg hover:bg-blue-400 transition"
              >
                <User size={18} />
                Register
              </Link>
            </div>
          ):(
            <div className="relative hidden sm:block">
              <button className="flex items-center " onClick={() => setProfileDropdownOpen(prev => !prev)}>
                <img className="h-10 w-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer" src={user?.avatar?.url} alt={user?.name} title={user?.name} />
              </button>
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-blue-200 border-blue-500 border rounded-md  shadow-lg z-50 ">
                  <div className="px-4 py-3 border-b border-blue-300 ">
                    <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                    <p className="text-sm text-gray-500 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    <Link onClick={()=>setProfileDropdownOpen(false)} to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                      My Profile
                    </Link>
                    <Link onClick={()=>setProfileDropdownOpen(false)} to="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                      My Order
                    </Link>
                    <Link onClick={()=>setProfileDropdownOpen(false)} to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-300">
                      Settings
                    </Link>
                  </div>
                  <div className="border-t border-blue-200 py-1 ">
                    <button onClick={()=>{
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-blue-300">Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* hamburger menu */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 "
          >
            {open ? (
              <X className="cursor-pointer" />
            ) : (
              <Menu className="cursor-pointer" />
            )}
          </button>
        </div>
      </div>

      {/* mobile view */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-[450px] opacity-100 translate-y-0 " : "max-h-0 opacity-0 translate-y-2"}`}
      >
        <div className="flex flex-col p-4 gap-4 ">
          <Link
            onClick={() => setOpen(false)}
            to=""
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to=""
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Products
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to=""
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            About Us
          </Link>
          <Link
            onClick={() => setOpen(false)}
            to=""
            className="text-gray-700 hover:text-blue-500 transition font-semibold"
          >
            Contact us
          </Link>

          {/* mobile view/login/register */}
          {!isAuthenticated ? (
            <div className="flex flex-col gap-4">
              <Link onClick={() => setOpen(false)} to='/login' className="text-gray-700 hover:text-blue-500 transition font-semibold">Sign In</Link>
              <Link onClick={() => setOpen(false)} to='/register' className="text-gray-700 hover:text-blue-500 transition font-semibold">Register</Link>
            </div>
          ) : (
            <div className="flex flex-col gap-4 border-t border-blue-300 pt-4 mt-2">
              <div className="flex items-center gap-3">
              <img className="h-10 w-10 rounded-full object-cover border-2 border-blue-500 cursor-pointer" src={user?.avatar?.url} alt={user?.name} title={user?.name} />
              <div>
                <p className="text-sm font-medium text-gray-700">{user?.name}</p>
                <p className="text-sm text-gray-500 truncate">{user?.email}</p>
              </div>
              </div>
              <Link onClick={() => setOpen(false)} to='/profile' className="text-gray-700 hover:text-blue-500 transition font-semibold">My Profile</Link>
              <Link onClick={() => setOpen(false)} to='/orders' className="text-gray-700 hover:text-blue-500 transition font-semibold">My Orders</Link>
              <Link onClick={() => setOpen(false)} to='/settings' className="text-gray-700 hover:text-blue-500 transition font-semibold">Settings</Link>
              <button onClick={()=>{
                handleLogout();
                setOpen(false);
              }} className="text-red-600 hover:text-red-500 transition font-semibold text-left cursor-pointer">Sign Out</button>
            </div>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
