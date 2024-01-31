// ProductPage.jsx

import React, { useState } from "react";
import ProductImageComponent from "./ProductImageComponent";

function ProductPage({ cart, addToCart }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  // Handle search
  const handleSearch = () => {
    if (searchQuery) {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((response) => response.json())
        .then((data) => {
          setFilteredProducts(data);
          setQuantities({});
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to search products");
        });
    } else {
      setFilteredProducts([]);
    }
  };

  // Handle quantity change
  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: Number(quantity) });
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
                <p>Available Quantity: {product.quantity}</p>
                <input
                  type="number"
                  value={quantities[product.id] || 0}
                  onChange={(e) =>
                    handleQuantityChange(product.id, e.target.value)
                  }
                  min="0"
                  max={product.quantity}
                />
                <button
                  onClick={() =>
                    addToCart(product, quantities[product.id] || 0)
                  }
                >
                  Add to Cart
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default ProductPage;
