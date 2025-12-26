import React, { useState } from "react";
import { signup } from "../../utils/auth";
import "./RegisterModal.css";

function RegisterModal({ onClose, onRegister, onLogInClick }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !email || !password || !avatar) {
      setError("All fields are required");
      return;
    }

    console.log("Sending signup payload:", { name, email, password, avatar });

    signup(name, email, password, avatar)
      .then((data) => {
        console.log("User registered:", data);
        setError("");
        if (onRegister) onRegister(data);
        if (onClose) onClose();
      })
      .catch((err) => {
        console.error("Signup failed:", err);
        setError(err.message || "Signup failed");
      });
  };

  return (
    <div className="register-modal">
      <h2 className="register-modal__header">Sign Up</h2>

      <form className="register-modal__form" onSubmit={handleSubmit}>
        <label className="register-modal__label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={error && !email ? "error" : ""}
            placeholder={error && !email ? error : "Email"}
            required
          />
        </label>

        <label className="register-modal__label">
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={error && !password ? "error" : ""}
            placeholder={error && !password ? error : "Password"}
            required
          />
        </label>

        <label className="register-modal__label">
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={error && !name ? "error" : ""}
            placeholder={error && !name ? error : "Name"}
            required
          />
        </label>

        <label className="register-modal__label">
          Avatar URL
          <input
            type="text"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
            className={error && !avatar ? "error" : ""}
            placeholder={error && !avatar ? error : "Avatar URL"}
            required
          />
        </label>

        <button
          type="submit"
          className="register-modal__submit-btn"
          disabled={!email || !password || !name || !avatar}
        >
          Sign Up
        </button>

        <span className="register-modal__switch">
          <button type="button" onClick={onLogInClick}>
            or Log In
          </button>
        </span>

        {error && <p className="error-message">{error}</p>}
      </form>

      <button
        type="button"
        className="register-modal__close-btn"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
}

export default RegisterModal;
