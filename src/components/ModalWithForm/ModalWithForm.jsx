import "./ModalWithForm.css";
import modalCloseBtn from "../../assets/modalCloseBtn.svg";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  onClose,
  name,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === name ? "modal__open" : ""
      }`}
    >
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button onClick={onClose} type="button" className="modal__close">
          <img src={modalCloseBtn} alt="Close modal" />
        </button>
        <form className="modal__form" name={name}>
          {children}
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
