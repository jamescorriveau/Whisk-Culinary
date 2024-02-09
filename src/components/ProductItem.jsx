// ProductItem.jsx

import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import ProductImageComponent from "./ProductImageContext";

const ProductItem = ({ product }) => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const isProductInCart = (productId) => {
    return cart.some((item) => item.id === productId);
  };

  return (
    <div className="product-item">
      <ProductImageComponent
        imageUrl={product.image}
        altText={product.product}
      />
      <h2 className="text-center text-sm mb-2">{product.product}</h2>
      <p className="text-xs mb-4 font-bold">${product.price}</p>
      <div className="flex justify-center items-center">
        {!isProductInCart(product.product_id) ? (
          <button
            onClick={() => addToCart({ ...product, id: product.product_id }, 1)}
            className="w-1/2 px-2 py-1 bg-black dark-gold-text rounded-md text-xs"
          >
            Add to Bag
          </button>
        ) : (
          <button
            onClick={() => removeFromCart(product.product_id)}
            className="w-1/2 px-2 py-1 bg-red-500 text-white rounded-md text-xs"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductItem;
