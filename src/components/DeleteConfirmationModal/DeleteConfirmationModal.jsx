import "./DeleteConfirmationModal.css";
import deleteModalBtn from "../../assets/deletemodalbtn.svg";

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className={`delete-modal__overlay ${
        isOpen ? "delete-modal__overlay--open" : ""
      }`}
      onClick={onCancel}
    >
      <div className="delete-modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete-modal__content">
          <button
            onClick={onCancel}
            type="button"
            className="delete-modal__close"
            aria-label="Close delete modal"
          >
            <img src={deleteModalBtn} alt="Close delete modal" />
          </button>

          <div className="delete-modal__title">
            <p> Are you sure you want to delete this item? </p>
            <p>This action is irreversible.</p>
          </div>

          <div className="delete-modal__buttons">
            <button
              className="delete-modal__button--confirm"
              onClick={onConfirm}
            >
              Yes, delete item
            </button>
            <button className="delete-modal__button--cancel" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
