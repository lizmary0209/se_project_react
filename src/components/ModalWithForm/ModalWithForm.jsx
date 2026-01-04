import { Modal } from "../Modal/Modal";
import "./ModalWithForm.css";

function ModalWithForm({
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
  children,
  isDisabled = false,
  hideSubmit = false,
}) {
  return (
    <Modal name={name} onClose={onClose} isOpen={isOpen}>
      <h2 className="modal__title">{title}</h2>

      <form onSubmit={onSubmit} className="modal__form" name={name}>
        {children}

        {!hideSubmit && (
          <button type="submit" className="modal__submit" disabled={isDisabled}>
            {buttonText}
          </button>
        )}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
