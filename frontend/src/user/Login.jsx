import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, removeErrors, removeSuccess } from "../features/products/user/userSlice";
import { toast } from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { error, loading, success } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // submit login
  const loginNow = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill all fields");
      return;
    }

    dispatch(login({ email, password }));
  };

  // handle success + error
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(removeErrors());
    }

    if (success) {
      toast.success("Login successful");
      dispatch(removeSuccess());
      navigate("/");
    }
  }, [error, success, dispatch, navigate]);

  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">

        <form onSubmit={loginNow} className="space-y-6">

          {/* TITLE */}
          <div className="text-center">
            <h2 className="font-bold text-3xl text-gray-800">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 mt-2">
              Sign in to continue
            </p>
          </div>

          {/* EMAIL FIELD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200"
            />
          </div>

          {/* PASSWORD FIELD */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-blue-200"
            />
          </div>

          {/* BUTTON */}
          <button
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            {loading ? "Logging in..." : "Sign In"}
          </button>

          {/* LINKS */}
          <p className="text-center text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-600">
              Sign Up
            </Link>
          </p>

          <p className="text-center text-sm">
            Forgot password?{" "}
            <Link to="/password/forgot" className="text-blue-600">
              Reset Password
            </Link>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Login;