// App.jsx

import React, { useState } from "react";
import ProductPage from "./components/ProductPage";

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    if (quantity > 0) {
      const cartItem = { ...product, quantity };
      setCart([...cart, cartItem]);
      console.log(`Added ${quantity} of ${product.name} to cart.`);
    } else {
      alert("Please select a quantity before adding to cart");
    }
  };

  return (
    <div className="App">
      <ProductPage cart={cart} addToCart={addToCart} />
      {/* add a ShoppingCart component */}
    </div>
  );
}

export default App;
