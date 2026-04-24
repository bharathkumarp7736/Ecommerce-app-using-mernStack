import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import PageTitle from "../Components/PageTitle";
import { useNavigate } from "react-router-dom";

const ShippingCartItem = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
    phoneNo: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const { address, city, state, country, pinCode, phoneNo } = form;

    if (!address || !city || !state || !country || !pinCode || !phoneNo) {
      alert("Please fill all fields");
      return;
    }

    // save to session
    sessionStorage.setItem("shippingInfo", JSON.stringify(form));

    navigate("/confirm");
  };

  return (
    <>
      <PageTitle title="Shipping Details" />
      <Navbar />

      <main className="pt-20 pb-10 min-h-screen bg-blue-200 flex justify-center items-center">
        <form
          onSubmit={submitHandler}
          className="bg-blue-300 p-8 rounded-2xl shadow-lg w-full max-w-lg border border-blue-500"
        >
          <h2 className="text-xl font-bold text-center mb-6">
            Shipping Info
          </h2>

          <input name="address" placeholder="Address" onChange={handleChange} className="w-full mb-3 p-3 rounded border" />
          <input name="city" placeholder="City" onChange={handleChange} className="w-full mb-3 p-3 rounded border" />
          <input name="state" placeholder="State" onChange={handleChange} className="w-full mb-3 p-3 rounded border" />
          <input name="country" placeholder="Country" onChange={handleChange} className="w-full mb-3 p-3 rounded border" />
          <input name="pinCode" placeholder="Pincode" onChange={handleChange} className="w-full mb-3 p-3 rounded border" />
          <input name="phoneNo" placeholder="Phone Number" onChange={handleChange} className="w-full mb-5 p-3 rounded border" />

          <button className="w-full bg-blue-500 text-white py-3 rounded">
            Continue
          </button>
        </form>
      </main>

      <Footer />
    </>
  );
};

export default ShippingCartItem;