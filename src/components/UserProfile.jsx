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
    // submission form logic/fetch
    console.log(event.target.name === "loginForm" ? loginForm : signupForm);
  };

  return (
    <div>
      <div>
        <h2>Login</h2>
        <form name="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            value={loginForm.email}
            onChange={handleLoginChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={loginForm.password}
            onChange={handleLoginChange}
            placeholder="Password"
          />
          <button type="submit">Login</button>
        </form>
      </div>

      <div>
        <h2>Sign Up</h2>
        <form name="signupForm" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={signupForm.name}
            onChange={handleSignupChange}
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            value={signupForm.email}
            onChange={handleSignupChange}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={signupForm.password}
            onChange={handleSignupChange}
            placeholder="Password"
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
