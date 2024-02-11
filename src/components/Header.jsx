// Header.jsx

import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CartContext } from "./CartContext";
import UserProfile from "./UserProfile";

function Header() {
  const { cart } = useContext(CartContext);
  const [localSearchQuery, setLocalSearchQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const fetchSuggestions = async (query) => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/search?q=${encodeURIComponent(query)}`
      );
      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.map((product) => product.name));
      } else {
        throw new Error("Network response was not ok.");
      }
    } catch (error) {
      console.error("Error fetching product suggestions:", error);
      setSuggestions([]);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setLocalSearchQuery(value);
    fetchSuggestions(value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(localSearchQuery)}`);
      setLocalSearchQuery("");
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocalSearchQuery(suggestion);
    setSuggestions([]);
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      event.target.closest(".header-button") === null
    ) {
      setShowDropdown(false);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (event.key === "Enter" && highlightedIndex >= 0) {
      handleSuggestionClick(suggestions[highlightedIndex]);
    }
  };

  useEffect(() => {
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <header className="header-custom bg-gray-800 text-white py-4 px-6 flex justify-between items-center">
      <form onSubmit={handleSearchSubmit} className="inline relative">
        <input
          type="text"
          placeholder="Search Our Products..."
          value={localSearchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="py-2 pl-10 pr-2 text-black outline-none bg-gray-200 rounded-full"
          style={{ width: "350px" }}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        >
          <path d="M 9 2 C 5.1458514 2 2 5.1458514 2 9 C 2 12.854149 5.1458514 16 9 16 C 10.747998 16 12.345009 15.348024 13.574219 14.28125 L 14 14.707031 L 14 16 L 20 22 L 22 20 L 16 14 L 14.707031 14 L 14.28125 13.574219 C 15.348024 12.345009 16 10.747998 16 9 C 16 5.1458514 12.854149 2 9 2 z M 9 4 C 11.773268 4 14 6.2267316 14 9 C 14 11.773268 11.773268 14 9 14 C 6.2267316 14 4 11.773268 4 9 C 4 6.2267316 6.2267316 4 9 4 z"></path>
        </svg>
        {suggestions.length > 0 && (
          <ul className="absolute z-10 bg-white w-full mt-1 border border-gray-200">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className={`text-black px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                  index === highlightedIndex ? "bg-gray-200" : ""
                }`}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
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
            <title>Home</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </button>
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
            <title>Profile</title>
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
              <title>Shopping Bag</title>
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
        <div ref={dropdownRef} className="dropdown-menu">
          <UserProfile />
        </div>
      )}
    </header>
  );
}

export default Header;
