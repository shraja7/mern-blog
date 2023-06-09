import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUserInfo } = useContext(UserContext);

  const handleProfileFetch = async () => {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        credentials: "include",
      });
      if (response.ok) {
        const userInfo = await response.json();
        // Update header with user information
        // You can store the user information in a global state management solution
        // or pass it down as props to the Header component
        console.log("User info:", userInfo);
      }
    } catch (error) {
      console.error("Profile fetch error:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    if (response.ok) {
      //parse json
      response.json().then((userInfo) => {
        //set context information
        setUserInfo(userInfo);
        setRedirect(true);
      });
    } else {
      alert("Login failed");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Username"
        className="input-field"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" className="submit-button">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
