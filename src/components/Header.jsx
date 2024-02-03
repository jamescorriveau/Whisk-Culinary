// Header.jsx

import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import UserProfile from "./UserProfile";

function Header() {
  const { isLoggedIn, setIsLoggedIn, cart } = useContext(CartContext);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleSearchChange = (e) => {
    setLocalSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
      setLocalSearchQuery("");
    }
  };
  const toggleLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <header className="fixed top-200 left-0 w-full bg-black text-white p-2 flex justify-between items-center z-50">
      <form onSubmit={handleSearchSubmit} className="inline">
        <input
          type="text"
          placeholder="Search..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          className="py-1 px-2 text-black outline-none"
        />
      </form>
      <div className="flex items-center">
        <button
          onClick={() => navigate("/")}
          className="header-button mx-2 dark-gold-text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
        {/* <button
          onClick={toggleLoginState}
          className="header-button mx-2 dark-gold-text"
        >
          {isLoggedIn ? "Sign Out" : "Sign In"}
        </button> */}
        <button
          onClick={toggleDropdown}
          className="header-button mx-2 dark-gold-text"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
          </svg>
        </button>

        <Link to="/cart" className="text-white">
          <button className="header-button mx-2 dark-gold-text flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
            <span className="ml-2">({totalItemsInCart})</span>
          </button>
        </Link>
      </div>
      {showDropdown && (
        <div className="dropdown-menu">
          <UserProfile />
        </div>
      )}
    </header>
  );
}

export default Header;
