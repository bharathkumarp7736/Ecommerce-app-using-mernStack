import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { shippingInfo } = useSelector((state) => state.cart);

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // 🔥 LOAD RAZORPAY SCRIPT
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const payHandler = async () => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load");
      return;
    }

    try {
      // 👉 create order from backend
      const { data } = await axios.post("/api/v1/payment/create", {
        amount: totalAmount,
      });

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // from .env
        amount: data.order.amount,
        currency: "INR",
        name: "Shopping Hub",
        description: "Order Payment",
        order_id: data.order.id,

        handler: async function (response) {
          // 🔥 verify payment
          await axios.post("/api/v1/payment/verify", response);

          // 🔥 create order after payment
          await axios.post("/api/v1/new/order", {
            shippingAddress: shippingInfo,
            orderItems: cartItems,
            totalPrice: totalAmount,
          });

          navigate("/success");
        },

        prefill: {
          name: "User",
          email: "test@test.com",
          contact: "9999999999",
        },

        theme: {
          color: "#3B82F6",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      console.log(err);
      alert("Payment failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-blue-200">
      <button
        onClick={payHandler}
        className="bg-green-500 text-white px-6 py-3 rounded-xl text-lg"
      >
        Pay ₹ {totalAmount}
      </button>
    </div>
  );
};

export default Payment;