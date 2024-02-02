// ShoppingCart.jsx

import React, { useContext } from "react";
import { CartContext } from "./CartContext";

function ShoppingCart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const incrementQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    addToCart(product, 1);
  };

  const decrementQuantity = (productId) => {
    const product = cart.find((item) => item.id === productId);
    if (product.quantity > 1) {
      addToCart(product, -1);
    } else {
      removeFromCart(productId);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
              <button onClick={() => incrementQuantity(item.id)}>+</button>
              <button onClick={() => decrementQuantity(item.id)}>-</button>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
}

export default ShoppingCart;
