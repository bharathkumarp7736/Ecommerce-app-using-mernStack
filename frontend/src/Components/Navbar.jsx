import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  ShoppingBag,
  ShoppingCart,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/products/user/userSlice";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.user
  );
  const { cartItems } = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(
        `/products?keyword=${encodeURIComponent(searchQuery.trim())}`
      );
    } else {
      navigate("/products");
    }
    setSearchQuery("");
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const isAdmin = user?.role === "admin";

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
          <Link className="font-semibold" to="/">
            Home
          </Link>
          <Link className="font-semibold" to="/products">
            Products
          </Link>
          <Link className="font-semibold" to="/about-us">
            About Us
          </Link>
          <Link className="font-semibold" to="/contact-us">
            Contact
          </Link>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center gap-4">
          {/* SEARCH */}
          <form
            onSubmit={handleSearch}
            className="hidden sm:flex items-center border border-blue-500 rounded overflow-hidden"
          >
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-3 py-2 text-sm w-40 focus:outline-none"
              placeholder="Search"
            />
            <button className="px-3">
              <Search size={18} />
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

          {/* AUTH */}
          {!isAuthenticated ? (
            <div className="hidden sm:flex gap-3">
              <Link to="/login">Sign In</Link>
              <Link to="/register">Register</Link>
            </div>
          ) : (
            <div className="relative hidden sm:block">
              <button
                onClick={() =>
                  setProfileDropdownOpen((prev) => !prev)
                }
              >
                <img
                  src={user?.avatar?.url}
                  className="w-10 h-10 rounded-full border-2 border-blue-500"
                />
              </button>

              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-blue-200 shadow-lg rounded-md w-48 z-50">
                  <div className="p-3 border-b">
                    <p className="font-semibold">{user?.name}</p>
                    <p className="text-xs text-gray-500">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    onClick={() =>
                      setProfileDropdownOpen(false)
                    }
                    to="/profile"
                    className="block px-4 py-2 hover:bg-blue-300"
                  >
                    My Profile
                  </Link>

                  <Link
                    onClick={() =>
                      setProfileDropdownOpen(false)
                    }
                    to="/orders"
                    className="block px-4 py-2 hover:bg-blue-300"
                  >
                    My Orders
                  </Link>

                  {/* ✅ ADMIN ONLY */}
                  {isAdmin && (
                    <Link
                      onClick={() =>
                        setProfileDropdownOpen(false)
                      }
                      to="/admin/orders"
                      className="block px-4 py-2 text-blue-600 font-bold hover:bg-blue-300"
                    >
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-blue-300"
                  >
                    Settings
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      setProfileDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-blue-300"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}

          {/* MOBILE MENU */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden ${
          open ? "block" : "hidden"
        } bg-blue-200 p-4`}
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

        {/*  ADMIN MOBILE */}
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