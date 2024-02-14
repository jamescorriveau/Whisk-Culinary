// App.jsx

import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import ProductSearch from "./components/ProductSearch";
import ShoppingCart from "./components/ShoppingCart";
import UserProfile from "./components/UserProfile";
import BrandHeader from "./components/BrandHeader";
import { CartProvider } from "./components/CartContext";
import { UserProvider } from "./components/UserContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import FooterBanner from "./components/FooterBanner";
import "./App.css";
import "./index.css";

function App() {
  const initialOptions = {
    clientId:
      "AZzIr4J9CN7dhty7p21kv8mZwt7gJo1KnEjx28A5_rmSEF6HGl6u-8VZIHpg2-agb1AC2X6JBqG0ajkm",
    currency: "USD",
    intent: "capture",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <UserProvider>
        <CartProvider>
          <div className="App">
            <BrandHeader />
            <Header />
            <div className="content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<ProductSearch />} />
                <Route path="/cart" element={<ShoppingCart />} />
                <Route path="/user-profile" element={<UserProfile />} />
              </Routes>
            </div>
            <FooterBanner />
          </div>
        </CartProvider>
      </UserProvider>
    </PayPalScriptProvider>
  );
}

export default App;
