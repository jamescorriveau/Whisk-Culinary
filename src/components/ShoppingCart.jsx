// ShoppingCart.jsx

import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageComponent";

function ShoppingCart() {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleQuantityChange = (productId, newQuantity) => {
    const product = cart.find((item) => item.id === productId);
    const quantityDifference = newQuantity - product.quantity;
    addToCart(product, quantityDifference);
  };

  return (
    <div className="pt-5">
      {cart.length > 0 ? (
        <ul>
          {cart.map((item, index) => (
            <li key={index} className="flex items-center mb-2.5">
              <ProductImageComponent
                imageUrl={item.image}
                altText={item.name}
                imageSizeClass="w-32 h-32"
              />
              <div className="ml-2.5 flex-grow">
                <strong>{item.name}</strong>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <strong>Price:</strong> ${item.price}
                  </div>
                  <div>
                    <div className="inline-flex items-center bg-dark-gold text-white px-3 py-1.5 rounded text-sm cursor-pointer mr-2">
                      <span>Qty:</span>
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id,
                            parseInt(e.target.value)
                          )
                        }
                        className="bg-transparent text-white ml-1 focus:outline-none appearance-none cursor-pointer"
                      >
                        {[...Array(10).keys()].map((num) => (
                          <option key={num + 1} value={num + 1}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
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
    </div>
  );
}

export default ShoppingCart;
