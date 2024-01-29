// ProductImage.jsx
import React from "react";

function ProductImageComponent({ imageUrl, altText }) {
  return (
    <div>
      <img src={imageUrl} alt={altText} />
    </div>
  );
}

export default ProductImageComponent;
