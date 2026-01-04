import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onClose, onLogin, onSignUpClick }) {
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
    <ModalWithForm
      title="Login"
      buttonText="Log In"
      name="login"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isDisabled={isDisabled}
      hideSubmit={true}
    >
      <label className="modal__label">
        Email
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
        {error ? "Incorrect password" : "Password"}
        <input
          type="password"
          className={`modal__input ${error ? "modal__input_error" : ""}`}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (error) setError(false);
          }}
          placeholder="Password"
          required
        />
      </label>

      {error && <p className="modal__error">Email or password incorrect</p>}

      <div className="modal__actions">
        <button type="submit" className="modal__submit" disabled={isDisabled}>
          Log In
        </button>

        <span className="modal__switch">
          <button type="button" onClick={onSignUpClick}>
            or Sign Up
          </button>
        </span>
      </div>
    </ModalWithForm>
  );
}

export default LoginModal;
