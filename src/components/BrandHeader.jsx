// BrandHeader.jsx

import React from "react";

function BrandHeader() {
  return (
    <div className="bg-white text-black py-2 px-4 pt-7 fixed top-0 left-0 w-full z-50">
      <div className="w-max mx-auto text-center">
        <h1
          className="text-5xl font-bold mb-2"
          style={{ fontFamily: "Didot, serif" }}
        >
          Whisk
        </h1>
        <p className="text-3xl" style={{ fontFamily: "Didot, serif" }}>
          Precision Cooking at Home
        </p>
      </div>
    </div>
  );
}

export default BrandHeader;
