// ShoppingCart.jsx

import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

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
    <div style={{ paddingTop: "20px" }}>
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <ProductImageComponent
                imageUrl={item.image}
                altText={item.name}
                imageSizeClass="w-32 h-32"
              />
              <div style={{ marginLeft: "10px" }}>
                <strong>{item.name}</strong> - Quantity: {item.quantity} <br />
                <strong></strong> ${item.price}
                <div>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your Shopping Bag is empty.</p>
      )}
    </div>
  );
}

export default ShoppingCart;
