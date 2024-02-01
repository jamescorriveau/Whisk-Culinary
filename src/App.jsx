import React, { useState } from "react";
import Header from "./components/Header";
import ProductSearch from "./components/ProductSearch";
import ShoppingCart from "./components/ShoppingCart";
import UserProfile from "./components/UserProfile";
import { CartProvider } from "./components/CartContext";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <CartProvider>
      <div className="App">
        <Header setSearchQuery={setSearchQuery} />
        <ProductSearch searchQuery={searchQuery} />
        <ShoppingCart />
        <UserProfile />
      </div>
    </CartProvider>
  );
}

export default App;
