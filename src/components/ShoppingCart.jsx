// ShoppingCart.jsx

import React from "react";

function ShoppingCart({ cart }) {
  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              {item.name} - Quantity: {item.quantity}
              {/* remove button */}
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
