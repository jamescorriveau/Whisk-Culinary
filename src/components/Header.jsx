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
    navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
  };

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header
      style={{
        backgroundColor: "black",
        color: "white",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search by Product Name"
          value={localSearchQuery}
          onChange={handleSearchChange}
          style={{ padding: "5px" }}
        />
        <button type="submit" style={{ margin: "0 10px" }}>
          Search
        </button>
      </form>
      <div>
        <button onClick={toggleLoginState} style={{ margin: "0 10px" }}>
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </button>
        <button>User Profile</button>
        <Link to="/cart" style={{ textDecoration: "none", color: "white" }}>
          <button>Cart ({totalItemsInCart})</button>
        </Link>
      </div>
    </header>
  );
}

export default Header;
