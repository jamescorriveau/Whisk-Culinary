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
        <div className="product-grid grid grid-cols-4 gap-4">
          {filteredProducts.length === 0 ? (
            <p>No products found.</p>
          ) : (
            filteredProducts.map((product) => (
              <div key={product.id} className="product-item">
                <ProductImageComponent
                  imageUrl={product.image}
                  altText={product.name}
                />
                <h2 className="text-center">{product.name}</h2>
                <p>Price: ${product.price}</p>
                <div className="flex justify-center items-center">
                  <button
                    onClick={() => addToCart(product, 1)}
                    className="w-full px-2 py-1 bg-black dark-gold-text rounded-md"
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
