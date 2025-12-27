import React, { useState } from "react";
import "./LoginModal.css";

function LoginModal({ onClose, onLogin, onSignUpClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) return;

    setError(false);

    Promise.resolve(onLogin({ email, password })).catch(() => {
      setError(true);
    });
  };

  const isDisabled = !email || !password;

  return (
    <div className="signin-modal">
      <h2 className="signin-modal__header">Log In</h2>

      <form className="signin-modal__form" onSubmit={handleSubmit}>
        <label className="signin-modal__label">
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Email"
            required
          />
        </label>

        <label className="signin-modal__label">
          {error ? "Incorrect password" : "Password"}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Password"
            required
          />
        </label>

        {error && (
          <p className="signin-modal__error">Email or password incorrect</p>
        )}

        <div className="signin-modal__actions">
          <button
            type="submit"
            className="signin-modal__submit-btn"
            disabled={isDisabled}
          >
            Log In
          </button>

          <span className="signin-modal__switch">
            <button type="button" onClick={onSignUpClick}>
              or Sign Up
            </button>
          </span>
        </div>
      </form>

      <button
        type="button"
        className="signin-modal__close-btn"
        onClick={onClose}
        aria-label="Close"
      >
        ×
      </button>
    </div>
  );
}

export default LoginModal;
