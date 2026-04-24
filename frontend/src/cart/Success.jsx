import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <>
      <PageTitle title="Order Success" />
      <Navbar />

      <main className="pt-20 min-h-screen bg-blue-200 flex items-center justify-center">
        <div className="bg-blue-300 p-10 rounded-2xl shadow-lg text-center max-w-md w-full border border-blue-500">
          
          {/* Icon */}
          <div className="text-green-600 text-5xl mb-4">✔</div>

          {/* Message */}
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Order Placed Successfully!
          </h2>

          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been placed and will be delivered soon.
          </p>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Link
              to="/orders"
              className="bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-400 transition"
            >
              View My Orders
            </Link>

            <Link
              to="/"
              className="bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-400 transition"
            >
              Continue Shopping
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default Success;