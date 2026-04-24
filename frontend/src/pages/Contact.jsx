import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import toast from "react-hot-toast";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill all fields");
      return;
    }

    toast.success("Message sent successfully!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Navbar />

      <main className="pt-20 pb-10 min-h-screen bg-blue-200 flex justify-center items-center">
        <div className="bg-blue-300 p-8 rounded-xl shadow-lg w-full max-w-lg">

          <h1 className="text-2xl font-bold text-center text-blue-600 mb-6">
            Contact Us
          </h1>

          <form onSubmit={submitHandler}>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-blue-500 rounded-lg"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-blue-500 rounded-lg"
            />

            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              className="w-full mb-4 p-3 border border-blue-500 rounded-lg"
              rows="4"
            ></textarea>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-400"
            >
              Send Message
            </button>

          </form>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Contact;