import React, { useState } from "react";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";

function App() {
  const [cart, setCart] = useState([]);

  // Function to add a product to the cart
  const addToCart = (product, quantity) => {
    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, update its quantity
      const updatedCart = [...cart];
      updatedCart[existingProductIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      // If the product is not in the cart, add it
      const newItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity,
      };
      setCart([...cart, newItem]);
    }

    console.log(`Added ${quantity} ${product.name}(s) to the cart.`);
  };

  // Function to remove a product from the cart
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    console.log(`Removed product with ID ${productId} from the cart.`);
  };

  return (
    <div className="App">
      <ProductPage addToCart={addToCart} />
      <ShoppingCart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
}

export default App;
