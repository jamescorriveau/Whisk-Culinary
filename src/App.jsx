import React from "react";
import ProductPage from "./components/ProductPage";
import ShoppingCart from "./components/ShoppingCart";
import UserProfile from "./components/UserProfile";
function App() {
  return (
    <div className="App">
      <ProductPage />
      <ShoppingCart />
      <UserProfile />
    </div>
  );
}

export default App;
