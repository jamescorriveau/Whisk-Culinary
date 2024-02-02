// Header.jsx

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { CartContext } from "./CartContext";

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
      <div>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <button>Home</button> {/* Home button added here */}
        </Link>
        <form onSubmit={handleSearchSubmit} style={{ display: "inline" }}>
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
      </div>
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
