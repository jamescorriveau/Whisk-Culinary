// BrandHeader.jsx

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function BrandHeader() {
  const leftSectionRef = useRef(null);
  const centerSectionRef = useRef(null);
  const rightSectionRef = useRef(null);

  useEffect(() => {
    gsap.to(
      [
        leftSectionRef.current,
        centerSectionRef.current,
        rightSectionRef.current,
      ],
      {
        duration: 3,
        opacity: 1,
        ease: "power2.out",
      }
    );
  }, []);

  return (
    <div
      className="brand-header-container bg-white text-black pb-12 px-6 pt-6 fixed top-0 left-0 w-full z-50"
      style={{ overflow: "hidden" }}
    >
      <div className="flex justify-between items-center w-full px-5">
        <div
          ref={leftSectionRef}
          className="flex items-center"
          style={{ marginLeft: "100px", opacity: 0 }}
        >
          <Link to="/">
            <img
              src="/Whisk-logo.png"
              alt="Whisk Logo"
              style={{ paddingRight: "20px", width: "135px" }}
            />
          </Link>
        </div>
        <div
          ref={centerSectionRef}
          className="flex-1 text-center"
          style={{ opacity: 0 }}
        >
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
        <div
          ref={rightSectionRef}
          className="flex items-center"
          style={{ opacity: 0 }}
        >
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
              style={{ paddingRight: "100px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BrandHeader;
