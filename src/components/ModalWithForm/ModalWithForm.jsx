import "./ModalWithForm.css";
import modalCloseBtn from "../../assets/modalCloseBtn.svg";

function ModalWithForm({
  buttonText,
  title,
  activeModal,
  onClose,
  name,
  onSubmit,
  children,
}) {
  const isOpen = activeModal === name;

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal__open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__content modal__content_form">
          <button type="button" className="modal__close" onClick={onClose}>
            <img src={modalCloseBtn} alt="Close modal" />
          </button>
          <h2 className="modal__title">{title}</h2>
          <form onSubmit={onSubmit} className="modal__form" name={name}>
            {children}
            <button type="submit" className="modal__submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
