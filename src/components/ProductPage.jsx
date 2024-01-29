// ProductPage.jsx
import React from "react";
import ProductImageComponent from "./ProductImageComponent"; // Corrected import path

function ProductPage() {
  const imageUrl =
    "https://cdnimg.webstaurantstore.com/images/products/large/407433/1544082.jpg";
  const altText = "Product Image";

  return (
    <div>
      <h1>Product Page</h1>
      <ProductImageComponent imageUrl={imageUrl} altText={altText} />{" "}
      {/* Updated component name */}
    </div>
  );
}

export default ProductPage;
