// BrandHeader.jsx

import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function BrandHeader() {
  const headerRef = useRef(null);
  const leftSectionRef = useRef(null);
  const centerSectionRef = useRef(null);
  const rightSectionRef = useRef(null);
  const logosRef = useRef([]);

  logosRef.current = [];
  const addLogoRef = (el) => {
    if (el && !logosRef.current.includes(el)) {
      logosRef.current.push(el);
    }
  };

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

    const handleScroll = () => {
      const triggerHeight = 50;
      const scrollAmount = window.scrollY;
      const rotation = scrollAmount % 180;

      if (window.scrollY > triggerHeight) {
        gsap.to(headerRef.current, { y: -100, opacity: 0, duration: 0.25 });
      } else {
        gsap.to(headerRef.current, { y: 0, opacity: 1, duration: 0.25 });
      }

      gsap.to(logosRef.current, { rotation, duration: 0.3, ease: "none" });
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={headerRef}
      className="brand-header-container bg-white text-black pb-4 px-6 pt-6 fixed top-0 left-0 w-full z-1050"
      style={{ overflow: "hidden" }}
    >
      <div className="flex justify-between items-center w-full">
        <div
          ref={leftSectionRef}
          className="flex items-center justify-start flex-1"
          style={{ opacity: 0, paddingLeft: "5%" }}
        >
          <Link to="/">
            <img
              ref={addLogoRef}
              src="/Whisk-logo.png"
              alt="Whisk Logo"
              style={{ width: "135px" }}
            />
          </Link>
        </div>
        <div
          ref={centerSectionRef}
          className="text-center"
          style={{ opacity: 0, flex: "0 1 auto", maxWidth: "60%" }}
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
          className="flex items-center justify-end flex-1"
          style={{ opacity: 0, paddingRight: "5%" }}
        >
          <a
            href="https://www.globalcutleryusa.com/knife-care"
            target="_blank"
            rel="noopener noreferrer"
            style={{ paddingRight: "20px" }}
          >
            <img
              src="/Global-logo.png"
              alt="Global Logo"
              style={{ maxWidth: "135px" }}
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
              style={{ maxWidth: "135px" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default BrandHeader;
