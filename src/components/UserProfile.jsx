// UserProfile.jsx

import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";

function UserProfile() {
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [signupForm, setSignupForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });
  const [currentUser, setCurrentUser] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = useContext(CartContext);
  const [hasAttemptedAuth, setHasAttemptedAuth] = useState(false);
  const [loginFailed, setLoginFailed] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false); // State to track if the user just signed up

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setHasAttemptedAuth(true); // User has attempted to log in
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        setCurrentUser(data.username);
        setIsLoggedIn(true);
        setIsNewUser(false); // Set isNewUser to false when existing user logs in
        console.log(`Login successful: Welcome back ${data.username}`);
        setLoginFailed(false);
      } else {
        console.error("Login error:", data);
        setLoginFailed(true);
      }
    } catch (error) {
      console.error("Network error:", error);
      setLoginFailed(true);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "GET" });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        setCurrentUser(null);
        setIsLoggedIn(false);
        console.log("Logout successful");
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setHasAttemptedAuth(true); // User has attempted to sign up
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      if (response.ok) {
        // Extracting the username from the response
        const responseData = await response.json();
        const { username } = responseData;

        // Update the state to indicate new user and set current user
        setIsNewUser(true);
        setCurrentUser(username);

        // Automatically login the user after successful signup
        const loginResponse = await fetch("/api/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: signupForm.email,
            password: signupForm.password,
          }),
        });

        if (loginResponse.ok) {
          // Update the state after successful login
          localStorage.setItem("isLoggedIn", "true");
          setCurrentUser(username);
          setIsLoggedIn(true);
          setIsNewUser(true); // Set isNewUser to true after successful signup
          console.log(`Login successful: Welcome ${username}`);
          setLoginFailed(false);
        } else {
          // Handle login failure
          console.error("Login error after signup:", loginResponse);
          setLoginFailed(true);
        }
      } else {
        // Handle signup failure
        console.error("Signup error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-4">
      <div className="dropdown">
        {isLoggedIn ? (
          <div>
            <p style={{ color: "black", marginBottom: "20px" }}>
              {isNewUser
                ? `Welcome to Whisk, ${currentUser}!`
                : `Welcome back, ${currentUser}!`}
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
              style={{ marginTop: "20px" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {hasAttemptedAuth && (
              <p style={{ color: "black", marginBottom: "20px" }}>
                Welcome to Whisk!
              </p>
            )}
            <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
            <form
              onSubmit={handleLogin}
              className="flex flex-col space-y-4 items-center"
            >
              <input
                type="email"
                name="email"
                value={loginForm.email}
                onChange={handleLoginChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="password"
                name="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
              >
                Login
              </button>
            </form>
            <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
            <form
              onSubmit={submitSignup}
              className="flex flex-col space-y-4 items-center"
            >
              <input
                type="text"
                name="username"
                value={signupForm.username}
                onChange={handleSignupChange}
                placeholder="Username"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="text"
                name="first_name"
                value={signupForm.first_name}
                onChange={handleSignupChange}
                placeholder="First Name"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="text"
                name="last_name"
                value={signupForm.last_name}
                onChange={handleSignupChange}
                placeholder="Last Name"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="email"
                name="email"
                value={signupForm.email}
                onChange={handleSignupChange}
                placeholder="Email"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <input
                type="password"
                name="password"
                value={signupForm.password}
                onChange={handleSignupChange}
                placeholder="Password"
                className="w-full p-2 border border-gray-300 rounded-md text-black"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
              >
                Sign Up
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
