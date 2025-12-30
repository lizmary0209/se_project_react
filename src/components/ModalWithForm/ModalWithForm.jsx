import "./ModalWithForm.css";
import modalCloseBtn from "../../assets/modalCloseBtn.svg";

function ModalWithForm({
  buttonText,
  title,
  isOpen,
  onClose,
  name,
  onSubmit,
  children,
  isDisabled = false,
}) {
  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onMouseDown={handleOverlayMouseDown}
    >
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal__open" : ""}`}
      >
        <div className="modal__content modal__content_form">
          <button type="button" className="modal__close" onClick={onClose}>
            <img src={modalCloseBtn} alt="Close modal" />
          </button>
          <h2 className="modal__title">{title}</h2>
          <form onSubmit={onSubmit} className="modal__form" name={name}>
            {children}
            <button
              type="submit"
              className="modal__submit"
              disabled={isDisabled}
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
