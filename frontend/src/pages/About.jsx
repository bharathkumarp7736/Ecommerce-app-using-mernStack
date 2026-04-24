import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <>
      <Navbar />

      <main className="pt-20 pb-10 min-h-screen bg-blue-200">
        <div className="max-w-5xl mx-auto px-4">

          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            About Us
          </h1>

          <div className="bg-blue-300 p-8 rounded-xl shadow-lg">

            <p className="text-gray-800 mb-4">
              Welcome to <span className="font-bold">Shopping Hub</span> — your
              one-stop destination for all your shopping needs.
            </p>

            <p className="text-gray-800 mb-4">
              We provide high-quality products at the best prices with fast
              delivery and secure payments.
            </p>

            <p className="text-gray-800 mb-4">
              Our mission is to make online shopping easy, reliable, and
              enjoyable for everyone.
            </p>

            <p className="text-gray-800">
              Thank you for trusting us ❤️
            </p>

          </div>

        </div>
      </main>

      <Footer />
    </>
  );
};

export default About;