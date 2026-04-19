import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-10 h-10 border-2 border-blue-500 rounded-full border-t-transparent animate-spin">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
