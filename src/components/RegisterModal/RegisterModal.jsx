import React, { useState } from "react";
import "./RegisterModal.css";
import modalCloseBtn from "../../assets/modalCloseBtn.svg";

function RegisterModal({ onClose, onRegister, onLogInClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name || !avatar) return;

    setError(false);

    Promise.resolve(onRegister({ name, avatar, email, password })).catch(() => {
      setError(true);
    });
  };

  const isDisabled = !email || !password || !name || !avatar;

  return (
    <div className="register-modal">
      <h2 className="register-modal__header">Sign Up</h2>

      <form className="register-modal__form" onSubmit={handleSubmit}>
        <label className="register-modal__label">
          Email*
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

        <label className="register-modal__label">
          Password*
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

        <label className="register-modal__label">
          Name *
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Name"
            required
          />
        </label>

        <label className="register-modal__label">
          Avatar URL *
          <input
            type="text"
            value={avatar}
            onChange={(e) => {
              setAvatar(e.target.value);
              if (error) setError(false);
            }}
            placeholder="Avatar URL"
            required
          />
        </label>

        {error && (
          <p className="register-modal__error">
            Registration failed. Please try again.
          </p>
        )}

        <button
          type="submit"
          className="register-modal__submit-btn"
          disabled={isDisabled}
        >
          Sign Up
        </button>

        <span className="register-modal__switch">
          <button type="button" onClick={onLogInClick}>
            or Log In
          </button>
        </span>
      </form>

      <button
        type="button"
        className="register-modal__close-btn"
        onClick={onClose}
        aria-label="Close"
      >
        <img src={modalCloseBtn} alt="Close button" />
      </button>
    </div>
  );
}

export default RegisterModal;
