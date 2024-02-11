// ShoppingCart.jsx

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import ProductImageContext from "./ProductImageContext";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

function ShoppingCart() {
  const { cart, setCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0.00");

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const calculateTotalAmount = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  useEffect(() => {
    setTotalAmount(calculateTotalAmount(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedCart);
    setCart(updatedCart);

    setTotalAmount(calculateTotalAmount(updatedCart));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    setCart(updatedCart);

    setTotalAmount(calculateTotalAmount(updatedCart));
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalAmount,
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert("Thank you for your purchase!");
      setCartItems([]);
      setCart([]);
    });
  };

  return (
    <div className="pt-5 px-4">
      {cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li
              key={index}
              className="flex items-center mb-2.5 py-2 border-b border-gray-300"
            >
              <ProductImageContext
                imageUrl={item.image}
                altText={item.name}
                imageSizeClass="w-32 h-32"
              />
              <div className="ml-6 flex-grow">
                <strong>{item.name}</strong>
                <p>{item.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center">
                    <span className="text-sm mr-2 font-medium text-gray-700">
                      Qty:
                    </span>
                    <select
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="w-1/2 px-1 py-1 bg-black dark-gold-text rounded-md text-md"
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="ml-2 bg-red-500 text-white px-3 py-1.5 rounded text-sm focus:outline-none focus:ring"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>Your Shopping Bag is empty.</p>
      )}
      {cartItems.length > 0 && (
        <div className="flex justify-end mt-2.5 mb-4">
          <div className="flex flex-col items-center">
            <div className="mb-4">
              <strong>Total: ${totalAmount}</strong>
            </div>
            {["PAYPAL", "PAYLATER", "CARD"].map((fundingSource, index) => (
              <div className="mb-2" key={`${totalAmount}-${fundingSource}`}>
                <PayPalButtons
                  fundingSource={FUNDING[fundingSource]}
                  style={{ layout: "vertical" }}
                  createOrder={createOrder}
                  onApprove={onApprove}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
