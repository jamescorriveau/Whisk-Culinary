// ShoppingCart.jsx

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import ProductImageContext from "./ProductImageContext";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

function ShoppingCart() {
  const { cart, setCart, removeFromCart } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  const handleRemoveFromCart = (productId) => {
    removeFromCart(productId);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: totalPrice.toFixed(2),
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      alert("Thank you for your purchase!");
      clearCart();
      setCartItems([]);
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
              <div className="ml-2.5 flex-grow">
                <strong>{item.name}</strong>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <strong>Price:</strong> ${item.price.toFixed(2)}
                  </div>
                  <div>
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="bg-red-500 text-white px-3 py-1.5 rounded text-sm focus:outline-none focus:ring"
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
          <div className="flex items-center">
            <div className="mr-4">
              <strong>Total: ${totalPrice.toFixed(2)}</strong>
            </div>
            {/* PayPal button */}
            <PayPalButtons
              fundingSource={FUNDING.PAYPAL}
              style={{ layout: "horizontal" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
            {/* Pay Later button */}
            <PayPalButtons
              fundingSource={FUNDING.PAYLATER}
              style={{ layout: "horizontal" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
            {/* Debit or Credit Card button */}
            <PayPalButtons
              fundingSource={FUNDING.CARD}
              style={{ layout: "horizontal" }}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
