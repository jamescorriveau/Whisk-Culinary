// BrandHeader.jsx

import React from "react";

function BrandHeader() {
  return (
    <div className="bg-white text-black py-7 px-4 pt-7 fixed top-0 left-0 w-full z-50">
      {/* Full width container */}
      <div className="flex justify-between items-center w-full px-4">
        {/* Whisk Logo aligned to the left */}
        <div className="flex items-center">
          <img
            src="/Whisk-logo.png"
            alt="Whisk Logo"
            style={{ paddingRight: "20px" }}
          />
        </div>

        {/* Centered Brand Name and Tagline */}
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

        {/* Partner Logos aligned to the right */}
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
