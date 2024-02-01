import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";

function Header({ setSearchQuery }) {
  const { isLoggedIn, setIsLoggedIn } = useContext(CartContext);
  const [localSearchQuery, setLocalSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    setSearchQuery(localSearchQuery);
  };

  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

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
      </div>
    </header>
  );
}

export default Header;
