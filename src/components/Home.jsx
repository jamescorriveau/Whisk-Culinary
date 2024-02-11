// Home.jsx

import React, { useEffect, useState, useRef, useContext } from "react";
import { gsap } from "gsap";
import productData from "../../server/db.json";
import ProductItem from "./ProductItem";
import ProductImageContext from "./ProductImageContext";
import { CartContext } from "./CartContext";
import "../App.css";

import globalKnivesImage from "../banner_images/global-knives-header-banner-1564754806.jpeg";
import kitchenAidImage from "../banner_images/banner-image-kitchen-aid.jpeg";
import staubMockupImage from "../banner_images/misono_single.webp";
import vitaMixImage from "../banner_images/vita-blenders-banner-center-captioned-desktop.avif";

function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [products, setProducts] = useState([]);
  const images = [
    globalKnivesImage,
    kitchenAidImage,
    staubMockupImage,
    vitaMixImage,
  ];
  const imageRef = useRef(null);

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    gsap.fromTo(
      imageRef.current,
      { x: 100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
  }, [currentImageIndex]);

  useEffect(() => {
    setProducts(productData.products.slice(42, 48));
  }, []);

  const additionalProductIds = [6, 7, 19, 20, 21, 22];

  const additionalProducts = productData.products.filter((product) =>
    additionalProductIds.includes(product.product_id)
  );

  return (
    <div>
      <div className="image-slider">
        <img
          ref={imageRef}
          src={images[currentImageIndex]}
          alt="Featured Product"
        />
      </div>
      <div
        className="tagline"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <h2 className="text-3xl" style={{ fontFamily: "Didot, serif" }}>
          High-Temp Cook Ware from Valor®
        </h2>
      </div>

      <div
        className="product-grid grid grid-cols-3 gap-12 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        {products.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </div>
      <div
        className="tagline"
        style={{ textAlign: "center", margin: "20px 0" }}
      >
        <h2 className="text-3xl" style={{ fontFamily: "Didot, serif" }}>
          Essential Kitchen Tools
        </h2>
      </div>

      <div
        className="product-grid grid grid-cols-3 gap-12 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        {additionalProducts.map((product) => (
          <ProductItem key={product.product_id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Home;
