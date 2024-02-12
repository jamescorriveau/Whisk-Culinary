// ProductImageComponent.jsx

import React from "react";

function ProductImageContext({ imageUrl, altText, imageSizeClass }) {
  return (
    <div
      className={`flex justify-center items-center h-full ${imageSizeClass}`}
    >
      <img
        src={imageUrl}
        alt={altText}
        className="max-w-full max-h-full object-contain"
      />
    </div>
  );
}

export default ProductImageContext;
