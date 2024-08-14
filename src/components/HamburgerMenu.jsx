// HamburgerMenu.jsx

import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import UserProfile from "./UserProfile";
import { CartContext } from "./CartContext";

function HamburgerMenu() {
  const { cart } = useContext(CartContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const totalItemsInCart = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="md:hidden">
      <button
        onClick={toggleMenu}
        className="hamburger-menu focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
      <nav
        className={`${
          isMenuOpen ? "block" : "hidden"
        } mt-2 bg-white shadow-lg rounded-lg`}
      >
        <ul className="flex flex-col text-center">
          <li>
            <Link to="/" className="block px-4 py-2">
              Home
            </Link>
          </li>
          <li>
            <Link to="/search" className="block px-4 py-2">
              Search
            </Link>
          </li>
          <li>
            <Link to="/cart" className="block px-4 py-2">
              Cart ({totalItemsInCart})
            </Link>
          </li>
          <li>
            <button onClick={toggleDropdown} className="block px-4 py-2">
              Profile
            </button>
          </li>
        </ul>
        {showDropdown && (
          <div className="dropdown-menu">
            <UserProfile />
          </div>
        )}
      </nav>
    </div>
  );
}

export default HamburgerMenu;
