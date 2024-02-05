// BrandHeader.jsx

import React from "react";
import { Link } from "react-router-dom";

function BrandHeader() {
  return (
    <div className="brand-header-container bg-white text-black pt-8 pb-6 px-6 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center w-full px-5">
        <div className="flex items-center">
          <Link to="/">
            {" "}
            <img
              src="/Whisk-logo.png"
              alt="Whisk Logo"
              style={{ paddingRight: "40px", width: "215px" }}
            />
          </Link>
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
          <a
            href="https://www.globalcutleryusa.com/knife-care"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/Global-logo.png"
              alt="Global Logo"
              style={{ paddingRight: "40px" }}
            />
          </a>
          <a
            href="https://consumerportal.servicebench.com/troubleshoot?token=ZHU6Y29uc3VtZXJQb3J0YWxQcm9kdWN0RGVzY3JpcHRpb247c2s6S0E7Y246V0hJUkxQT09MO3NhOjI3&cparam="
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/KitchenAid-logo.png"
              alt="KitchenAid Logo"
              style={{ paddingRight: "5px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BrandHeader;
