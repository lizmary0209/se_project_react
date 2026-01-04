import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister, onLogInClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || !name || !avatar) return;

    setError(false);

    Promise.resolve(onRegister({ name, avatar, email, password })).catch(() =>
      setError(true)
    );
  };

  const isDisabled = !email || !password || !name || !avatar;

  return (
    <ModalWithForm
      name="register"
      title="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      hideSubmit
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          className="modal__input"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Email"
          required
        />
      </label>

      <label className="modal__label">
        Password*
        <input
          type="password"
          className="modal__input"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Password"
          required
        />
      </label>

      <label className="modal__label">
        Name*
        <input
          type="text"
          className="modal__input"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          className="modal__input"
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
        <p className="modal__error">Registration failed. Please try again.</p>
      )}

      <div className="modal__actions">
        <button type="submit" className="modal__submit" disabled={isDisabled}>
          Sign Up
        </button>

        <span className="modal__switch">
          <button type="button" onClick={onLogInClick}>
            or Log In
          </button>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default RegisterModal;
