// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ProductSearch from "./components/ProductSearch";
import ShoppingCart from "./components/ShoppingCart";
import UserProfile from "./components/UserProfile";
import { CartProvider } from "./components/CartContext";
import BrandHeader from "./components/BrandHeader";
import "./App.css";
import "./index.css";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrandHeader />
        <Header />
        <div className="content">
          {" "}
          {/* Add a content div */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<ProductSearch />} />
            <Route path="/cart" element={<ShoppingCart />} />
            <Route path="/user-profile" element={<UserProfile />} />
          </Routes>
        </div>
      </div>
    </CartProvider>
  );
}

export default App;
