import React from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  return (
    <form className="register-form">
      <h1>Register</h1>
      <input type="text" placeholder="Username" className="input-field" />
      <input type="email" placeholder="Email" className="input-field" />
      <input type="password" placeholder="Password" className="input-field" />
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
