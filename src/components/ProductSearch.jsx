// ProductSearch.jsx

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

function ProductSearch() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  // State for autocomplete suggestions
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (searchQuery) {
      fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`)
        .then((response) => response.json())
        .then((data) => setFilteredProducts(data))
        .catch((error) => {
          console.error("Error fetching data:", error);
          setError("Failed to search products");
        });
    } else {
      setFilteredProducts([]);
    }
  }, [searchQuery]);

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  // Event handler for search input change
  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    let matches = [];
    if (value.length > 0) {
      // Filter products based on the search term
      matches = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(value.toLowerCase())
      );
    }
    setSuggestions(matches);
  };

  // Event handler for suggestion click
  const handleSuggestionClick = (product) => {
    setSearchTerm("");
    setSuggestions([]);
    navigate(`/product/${product.id}`); // Navigate to the product details page
  };

  // Event handler for keyboard navigation
  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : (
        <div
          className="product-grid grid grid-cols-3 gap-12 mx-auto"
          style={{ maxWidth: "800px" }}
        >
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <ProductImageComponent
                  imageUrl={product.image}
                  altText={product.name}
                />
                <h2 className="text-center text-sm mb-2">{product.name}</h2>
                <p className="text-xs mb-4 font-bold">${product.price}</p>
                <div className="flex justify-center items-center">
                  {!isProductInCart(product.id) ? (
                    <button
                      onClick={() => addToCart(product, 1)}
                      className="w-1/2 px-2 py-1 bg-black dark-gold-text rounded-md text-xs"
                    >
                      Add to Bag
                    </button>
                  ) : (
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="w-1/2 px-2 py-1 bg-red-500 text-white rounded-md text-xs"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
      {/* Autocomplete suggestions */}
      <ul>
        {suggestions.map((product, index) => (
          <li
            key={product.id}
            className={index === highlightedIndex ? "highlighted" : ""}
            onClick={() => handleSuggestionClick(product)}
          >
            {product.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductSearch;
