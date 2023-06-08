import React, { useState } from "react";
import "./RegisterPage.css";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // handle register async
  const handleRegister = async (e) => {
    e.preventDefault();
    //try catch block

    // fetch
    const response = await fetch("http://localhost:4000/register", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.status === 200) {
      alert("registeration successful");
    } else {
      alert("registeration failed");
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h1>Register</h1>
      <input
        type="text"
        placeholder="Username"
        className="input-field"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button type="submit" className="submit-button">
        Register
      </button>
    </form>
  );
};

export default RegisterPage;
