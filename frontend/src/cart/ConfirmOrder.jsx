import React from "react";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import { useNavigate } from "react-router-dom";

const ConfirmOrder = () => {
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);

  const shippingInfo = JSON.parse(sessionStorage.getItem("shippingInfo"));

  const subTotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const tax = subTotal * 0.18;
  const shippingCharges = subTotal > 399 ? 0 : 50;
  const total = subTotal + tax + shippingCharges;

  const proceedToPayment = () => {
    const orderInfo = {
      subTotal,
      tax,
      shippingCharges,
      total,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(orderInfo));
    navigate("/payment");
  };

  return (
    <>
      <PageTitle title="Confirm Order" />
      <Navbar />

      <main className="pt-20 bg-blue-200 min-h-screen">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT - SHIPPING + ITEMS */}
          <div className="lg:col-span-2 space-y-6">

            {/* Shipping Info */}
            <div className="bg-blue-300 p-6 rounded-xl">
              <h2 className="font-bold mb-3">Shipping Info</h2>
              <p>{shippingInfo?.address}</p>
              <p>{shippingInfo?.city}</p>
              <p>{shippingInfo?.pincode}</p>
              <p>{shippingInfo?.phone}</p>
            </div>

            {/* Cart Items */}
            <div className="bg-blue-300 p-6 rounded-xl">
              <h2 className="font-bold mb-3">Cart Items</h2>

              {cartItems.map((item) => (
                <div key={item.product} className="flex justify-between mb-2">
                  <span>{item.name}</span>
                  <span>
                    {item.quantity} × ₹{item.price}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT - SUMMARY */}
          <div className="bg-blue-300 p-6 rounded-xl h-fit">
            <h2 className="font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {subTotal}</span>
            </div>

            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹ {tax}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹ {shippingCharges}</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>₹ {total}</span>
            </div>

            <button
              onClick={proceedToPayment}
              className="w-full mt-4 bg-blue-500 text-white py-2 rounded"
            >
              Proceed to Payment
            </button>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default ConfirmOrder;