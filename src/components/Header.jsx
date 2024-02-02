// Header.jsx

import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "./CartContext";
import { Link } from "react-router-dom";

function Header() {
  const { isLoggedIn, setIsLoggedIn, cart } = useContext(CartContext);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
    }
  };

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="fixed top-0 left-0 w-full bg-black text-white p-2 flex justify-between items-center z-50 mt-16">
      {" "}
      {/* Added mt-16 for margin-top */}
      <form onSubmit={handleSearchSubmit} className="inline">
        <input
          type="text"
          placeholder="Search by Product Name"
          value={localSearchQuery}
          onChange={handleSearchChange}
          className="py-1 px-2 text-black"
        />
      </form>
      <div>
        <button onClick={() => navigate("/")} className="header-button mx-2">
          Home
        </button>
        <button onClick={toggleLoginState} className="header-button mx-2">
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </button>
        <Link to="/user-profile" className="text-white">
          <button className="header-button mx-2">User Profile</button>
        </Link>
        <Link to="/cart" className="text-white">
          <button className="header-button mx-2">
            Cart ({totalItemsInCart})
          </button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
