import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/products/user/userSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);

  const isAdmin = user?.role === "admin";

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?keyword=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="sticky top-0 w-full bg-blue-300 shadow-md z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-bold text-blue-500"
        >
          <ShoppingBag />
          <span>Shopping Hub</span>
        </Link>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-8">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/about-us">About</Link>
          <Link to="/contact-us">Contact</Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">

          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center border rounded overflow-hidden"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-1 text-sm focus:outline-none"
              placeholder="Search"
            />
            <button className="px-2">
              <Search size={16} />
            </button>
          </form>

          {/* CART */}
          <Link to="/cart" className="relative">
            <ShoppingCart />
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartItems.length}
              </span>
            )}
          </Link>

          {/* USER */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex gap-3">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                <img
                  src={user?.avatar?.url}
                  className="w-10 h-10 rounded-full border"
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-48 z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">{user?.email}</p>
                  </div>

                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">
                    Profile
                  </Link>

                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">
                    Orders
                  </Link>

                  {isAdmin && (
                    <Link
                      to="/admin/orders"
                      className="block px-4 py-2 text-blue-600 font-bold hover:bg-gray-100"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden z-50"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* BACKDROP */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/30 z-40 md:hidden"
        />
      )}

      {/* MOBILE MENU */}
      <div
  className={`fixed top-16 left-0 w-full bg-blue-200 z-50 p-5 md:hidden ${
    open ? "flex flex-col gap-4" : "hidden"
  }`}
>
        <Link onClick={() => setOpen(false)} to="/">
          Home
        </Link>

        <Link onClick={() => setOpen(false)} to="/products">
          Products
        </Link>

        <Link onClick={() => setOpen(false)} to="/orders">
          Orders
        </Link>

        {!isAuthenticated ? (
          <>
            <Link onClick={() => setOpen(false)} to="/login">
              Login
            </Link>
            <Link onClick={() => setOpen(false)} to="/register">
              Register
            </Link>
          </>
        ) : (
          <>
            <Link onClick={() => setOpen(false)} to="/profile">
              Profile
            </Link>
            <button onClick={handleLogout} className="text-left text-red-500">
              Logout
            </button>
          </>
        )}

        {isAdmin && (
          <Link
            onClick={() => setOpen(false)}
            to="/admin/orders"
            className="text-blue-600 font-bold"
          >
            Admin Panel
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;