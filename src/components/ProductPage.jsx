// ProductPage.jsx

import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

function ProductPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});

  const { addToCart } = useContext(CartContext);

  // Handle search functionality
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

  // Increment quantity
  const incrementQuantity = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: (quantities[productId] || 0) + 1,
    });
  };

  // Decrement quantity
  const decrementQuantity = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: Math.max((quantities[productId] || 0) - 1, 0),
    });
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
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div>
          {filteredProducts.length === 0 ? (
            <p>No products found. Please search again.</p>
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
                <div>
                  <button onClick={() => decrementQuantity(product.id)}>
                    -
                  </button>
                  <input
                    type="number"
                    value={quantities[product.id] || 0}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    min="0"
                    max={product.quantity}
                  />
                  <button onClick={() => incrementQuantity(product.id)}>
                    +
                  </button>
                </div>
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
