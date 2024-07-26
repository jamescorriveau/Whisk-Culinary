// ProductSearch.jsx

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageContext";

function ProductSearch() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const { cart, addToCart, removeFromCart } = useContext(CartContext);

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

  const isProductInCart = (productId) =>
    cart.some((item) => item.id === productId);

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
    </div>
  );
}

export default ProductSearch;
