// UserProfile.jsx

import React, { useState, useContext, useEffect } from "react";
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
  const [isNewUser, setIsNewUser] = useState(false);
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, [setIsLoggedIn]);

  const toggleLoginFormVisibility = () => {
    setLoginForm({ email: "", password: "" });
    setIsLoginFormVisible(!isLoginFormVisible);
    setLoginFailed(false);
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setHasAttemptedAuth(true);
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginForm),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem(
          "currentUser",
          JSON.stringify({ username: data.username })
        );
        setCurrentUser(data.username);
        setIsLoggedIn(true);
        console.log(`User logged in: ${data.username}`);
        setIsNewUser(false);
        setLoginFailed(false);
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      setLoginFailed(true);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", { method: "GET" });

      if (response.ok) {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("currentUser");
        setCurrentUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const submitSignup = async (e) => {
    e.preventDefault();
    setHasAttemptedAuth(true);
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupForm),
      });

      if (response.ok) {
        const responseData = await response.json();
        setIsNewUser(true);
        setCurrentUser(responseData.username);
        console.log(`New user registered: ${responseData.username}`);
        handleLogin({ preventDefault: () => {}, target: loginForm });
      } else {
        console.error("Signup error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-4">
      <div className="dropdown">
        <img
          src="/Whisk-logo.png"
          alt="Whisk Logo"
          className="mx-auto mt-3"
          style={{ maxWidth: "100px", height: "auto" }}
        />

        {isLoggedIn ? (
          <div>
            <p
              style={{
                color: "black",
                marginBottom: "10px",
                paddingTop: "20px",
              }}
            >
              {isNewUser ? `Welcome to Whisk!` : `Welcome back!`}
            </p>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
              style={{ marginTop: "20px", fontFamily: "Didot, serif" }}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            {hasAttemptedAuth && loginFailed && (
              <p style={{ color: "red", marginBottom: "20px" }}>
                Login failed. Please try again.
              </p>
            )}
            {isLoginFormVisible ? (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <form
                  onSubmit={handleLogin}
                  className="flex flex-col space-y-4 items-center"
                  style={{ fontFamily: "Didot, serif" }}
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
                    style={{ fontFamily: "Didot, serif" }}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={toggleLoginFormVisibility}
                    className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
                    style={{ fontFamily: "Didot, serif" }}
                  >
                    Sign Up
                  </button>
                </form>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
                <form
                  onSubmit={submitSignup}
                  className="flex flex-col space-y-4 items-center"
                  style={{ fontFamily: "Didot, serif" }}
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
                  <button
                    type="button"
                    onClick={toggleLoginFormVisibility}
                    className="w-full px-4 py-2 bg-black dark-gold-text rounded-md"
                    style={{ fontFamily: "Didot, serif" }}
                  >
                    Have an account? Login
                  </button>
                </form>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
