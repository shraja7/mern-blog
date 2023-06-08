import React from "react";
import "./LoginPage.css";

const LoginPage = () => {
  return (
    <form className="login-form">
      <h1>Login</h1>
      <input type="text" placeholder="Username" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <button type="submit" className="submit-button">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
