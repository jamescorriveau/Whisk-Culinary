// BrandHeader.jsx

import React from "react";

function BrandHeader() {
  return (
    <div className="bg-white text-black py-7 px-4 pt-7 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-screen-lg mx-auto">
        <div className="flex items-center">
          <img
            src="/Whisk-logo.png"
            alt="Whisk Logo"
            style={{ paddingRight: "20px" }}
          />
          <div className="text-center">
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
        <div className="logo flex">
          <img
            src="/Global-logo.png"
            alt="Global Logo"
            style={{ paddingRight: "10px" }}
          />
          <img src="/KitchenAid-logo.png" alt="KitchenAid Logo" />
        </div>
      </div>
    </div>
  );
}

export default BrandHeader;
