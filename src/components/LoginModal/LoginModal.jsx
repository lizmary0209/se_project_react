import React, { useState } from "react";
import { signin } from "../../utils/auth";

function LoginModal({ onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both email and password are required");
      return;
    }

    const payload = { email, password };
    console.log("Sending login payload:", payload);

    signin(payload)
      .then((data) => {
        console.log("User logged in:", data);
        setError("");
        onLogin && onLogin(data);
        onClose();
      })
      .catch((err) => {
        console.error("Login failed:", err);
        setError(err.message || "Login failed");
      });
  };

  return (
    <div className="signin-modal">
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Log In</button>

        {error && <p className="error">{error}</p>}
      </form>
      <button type="button" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export default LoginModal;
