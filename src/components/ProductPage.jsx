// ProductPage.jsx

import React, { useEffect, useState } from "react";
import ProductImageComponent from "./ProductImageComponent";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const altText = "Product Image";

  useEffect(() => {
    fetch("/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      });
  }, []);

  const handleSearch = () => {
    fetch(`http://localhost:3030/products?q=${searchQuery}`)
      .then((response) => response.json())
      .then((data) => {
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
      });
  };

  return (
    <div>
      <h1>Product Page</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <ProductImageComponent
                  imageFilename={product.image.split("/").pop()}
                  altText={altText}
                />
                <p>Price: ${product.price}</p>
                <p>Quantity: {product.quantity}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
