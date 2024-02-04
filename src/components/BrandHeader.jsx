// BrandHeader.jsx

import React from "react";

function BrandHeader() {
  return (
    <div className="brand-header-container bg-white text-black pt-7 pb-7 px-4 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-full px-5">
        <div className="flex items-center">
          <img
            src="/Whisk-logo.png"
            alt="Whisk Logo"
            style={{ paddingRight: "30px" }}
          />
        </div>
        <div className="flex-1 text-center">
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
        <div className="flex items-center">
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
