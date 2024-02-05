// Home.jsx

import React, { useEffect, useState, useRef, useContext } from "react";
import { gsap } from "gsap";
import globalKnivesImage from "../banner_images/global-knives-header-banner-1564754806.jpeg";
import kitchenAidImage from "../banner_images/banner-image-kitchen-aid.jpeg";
import staubMockupImage from "../banner_images/misono_single.webp";
import vitaMixImage from "../banner_images/vita-blenders-banner-center-captioned-desktop.avif";
import productData from "../../server/db.json";
import ProductImageComponent from "./ProductImageComponent";
import "../App.css";
import { CartContext } from "./CartContext";

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

  const { addToCart } = useContext(CartContext);

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
    setProducts(productData.products.slice(2, 8));
  }, []);

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
        className="product-grid grid grid-cols-3 gap-12 mx-auto"
        style={{ maxWidth: "800px" }}
      >
        {products.map((product) => (
          <div key={product.product_id} className="product-item">
            <ProductImageComponent
              imageUrl={product.image}
              altText={product.product}
            />
            <h2 className="text-center text-sm mb-2">{product.product}</h2>
            <p className="text-xs mb-4 font-bold">${product.price}</p>
            <div className="flex justify-center items-center">
              <button
                onClick={() =>
                  addToCart(
                    {
                      id: product.product_id,
                      name: product.product,
                      image: product.image,
                      price: product.price,
                    },
                    1
                  )
                }
                className="w-1/2 px-2 py-1 bg-black dark-gold-text rounded-md text-xs"
              >
                Add to Bag
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
