// Home.jsx

import React, { useEffect, useState } from "react";
import globalKnivesImage from "../images/global-knives-header-banner-1564754806.jpeg";
import kitchenAidImage from "../images/kitchenaid-brand-header-banner-1564126621.webp";
import staubMockupImage from "../images/staubmockupbanner1.1.jpeg";
import "../App.css";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [globalKnivesImage, kitchenAidImage, staubMockupImage];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div>
      <div className="image-slider">
        <img src={images[currentImageIndex]} alt="Product" />
      </div>
    </div>
  );
}

export default Home;
