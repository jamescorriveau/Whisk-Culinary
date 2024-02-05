// UserProfile.jsx

import React, { useState } from "react";

function UserProfile() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const [currentUser, setCurrentUser] = useState(null);

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const submitLogin = async () => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);
        setCurrentUser(loginForm.email); // Set user as logged in with their email
      } else {
        console.error("Login error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const submitSignup = async () => {
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupForm),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup success:", data);
        setCurrentUser(signupForm.username);
      } else {
        console.error("Signup error:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-4">
      <div className="dropdown">
        {currentUser ? (
          <p>Welcome back {currentUser}!</p>
        ) : (
          <p>Welcome to Whisk!</p>
        )}
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitLogin();
          }}
          className="flex flex-col space-y-4 items-center"
        >
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
          >
            Login
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitSignup();
          }}
          className="flex flex-col space-y-4 items-center"
        >
          <div className="w-full">
            <input
              type="text"
              name="username"
              value={signupForm.username}
              onChange={handleSignupChange}
              placeholder="Username"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="first_name"
              value={signupForm.first_name}
              onChange={handleSignupChange}
              placeholder="First Name"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="w-full">
            <input
              type="text"
              name="last_name"
              value={signupForm.last_name}
              onChange={handleSignupChange}
              placeholder="Last Name"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
