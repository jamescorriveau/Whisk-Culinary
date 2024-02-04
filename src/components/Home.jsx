// Home.jsx

import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import globalKnivesImage from "../images/global-knives-header-banner-1564754806.jpeg";
import kitchenAidImage from "../images/banner-image-kitchen-aid.jpeg";
import staubMockupImage from "../images/misono_single.webp";
import vitaMixImage from "../images/vita-blenders-banner-center-captioned-desktop.avif";
import "../App.css";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    globalKnivesImage,
    kitchenAidImage,
    staubMockupImage,
    vitaMixImage,
  ];
  const imageRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
  }, [currentImageIndex]);

  return (
    <div>
      <div className="image-slider">
        <img ref={imageRef} src={images[currentImageIndex]} alt="Product" />
      </div>
    </div>
  );
}

export default Home;

// src / images / vita - blenders - banner - center - captioned - desktop.avif;
