// ProductSearch.jsx

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

function ProductSearch({ searchQuery }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [error, setError] = useState(null);
  const [quantities, setQuantities] = useState({});
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
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
  }, [searchQuery]);

  const incrementQuantity = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: (quantities[productId] || 0) + 1,
    });
  };

  const decrementQuantity = (productId) => {
    setQuantities({
      ...quantities,
      [productId]: Math.max((quantities[productId] || 0) - 1, 0),
    });
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities({ ...quantities, [productId]: Number(quantity) });
  };

  return (
    <div>
      <h1>Product Page</h1>
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

export default ProductSearch;
