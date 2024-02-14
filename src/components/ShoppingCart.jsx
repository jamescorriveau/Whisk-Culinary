// ShoppingCart.jsx

import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import ProductImageContext from "./ProductImageContext";
import { PayPalButtons, FUNDING } from "@paypal/react-paypal-js";

function ShoppingCart() {
  const { cart, setCart, isLoggedIn } = useContext(CartContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState("0.00");
  const [showCheckoutButton, setShowCheckoutButton] = useState(true);

  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  useEffect(() => {
    setTotalAmount(
      cartItems
        .reduce((total, item) => total + item.price * item.quantity, 0)
        .toFixed(2)
    );
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

  const calculateTotalAmount = (items) => {
    return items
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
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

  const handleCheckout = () => {
    if (!isLoggedIn) {
      alert("Please log in to checkout.");
    } else {
      setShowCheckoutButton(false);
    }
  };

  return (
    <div className="pt-5 px-4">
      {cartItems.length > 0 ? (
        <>
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
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
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
          <div className="flex justify-end mt-2.5 mb-4">
            <div className="flex flex-col items-end">
              <div className="mb-4">
                <strong>Total: ${totalAmount}</strong>
              </div>
              {showCheckoutButton && (
                <button
                  onClick={handleCheckout}
                  className="px-4 py-2 bg-black dark-gold-text rounded-md"
                >
                  Checkout
                </button>
              )}
            </div>
          </div>
          {!showCheckoutButton && isLoggedIn && (
            <div className="flex justify-end mt-2.5 mb-4">
              <div className="flex flex-col items-end">
                {["PAYPAL", "CARD"].map((fundingSource, index) => (
                  <div className="mb-2" key={index}>
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
        </>
      ) : (
        <div className="flex justify-center items-center h-full">
          <div className="text-center">
            <img
              src="https://cdn3.iconfinder.com/data/icons/shopping-and-ecommerce-28/90/empty_cart-512.png"
              alt="Empty Cart"
              className="mx-auto mt-12 mb-4"
              style={{ width: "150px", height: "150px" }}
            />
            <p className="pb-20">Your Shopping Bag is empty.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShoppingCart;
