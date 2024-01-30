// ProductImageComponenet.jsx

import React from "react";

function ProductImageComponent({ imageFilename, altText }) {
  const imageUrl = `/product/${imageFilename}`;

  return (
    <div>
      <img
        src={imageUrl}
        alt={altText}
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

export default ProductImageComponent;
