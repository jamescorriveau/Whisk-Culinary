// ProductPage.jsx

import React, { useState } from "react";
import ProductImageComponent from "./ProductImageComponent";

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);

  // Handle search
  const handleSearch = () => {
    if (searchQuery) {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredProducts(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to search products");
        });
    } else {
      setFilteredProducts([]);
    }
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
            <p>Enter a search term to find products.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <ProductImageComponent
                  imageUrl={product.image}
                  altText={product.name}
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
