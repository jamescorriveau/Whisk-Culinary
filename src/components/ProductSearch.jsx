// ProductSearch.jsx

import React, { useContext, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

function ProductSearch() {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q");

  const { addToCart } = useContext(CartContext);

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
                  style={{ maxWidth: "100px", height: "auto" }}
                />
                <h2 className="text-center text-sm">{product.name}</h2>
                <p className="text-xs mb-4">${product.price}</p>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-1/2 px-2 py-1 bg-black dark-gold-text rounded-md text-xs"
                  >
                    Add to Bag
                  </button>
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
