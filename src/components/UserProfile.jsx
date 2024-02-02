// UserProfile.jsx

import React, { useState } from "react";

function UserProfile() {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.name === "loginForm" ? loginForm : signupForm);
  };

  return (
    <div className="flex flex-col items-center space-y-12 p-4">
      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        <form
          name="loginForm"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 items-center"
        >
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-[#d5b500] rounded-md"
          >
            Login
          </button>
        </form>
      </div>

      <div className="w-1/2">
        <h2 className="text-xl font-bold mb-4 text-center">Sign Up</h2>
        <form
          name="signupForm"
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 items-center"
        >
          <div className="w-full">
            <input
              type="text"
              name="name"
              value={signupForm.name}
              onChange={handleSignupChange}
              placeholder="Name"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <input
              type="email"
              name="email"
              value={signupForm.email}
              onChange={handleSignupChange}
              placeholder="Email"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="w-full">
            <input
              type="password"
              name="password"
              value={signupForm.password}
              onChange={handleSignupChange}
              placeholder="Password"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-black text-[#d5b500] rounded-md"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
