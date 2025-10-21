import "./DeleteConfirmationModal.css";
import deleteModalBtn from "../../assets/deletemodalbtn.svg";

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className={`delete__modal_overlay ${
        isOpen ? "delete__modal_overlay_open" : ""
      }`}
      onClick={onCancel}
    >
      <div className="delete__modal" onClick={(e) => e.stopPropagation()}>
        <div className="delete__modal_content">
          <div className="delete__modal_content-btn">
            <button
              onClick={onCancel}
              type="button"
              className="delete__modal_close"
              aria-label="Close delete modal"
            >
              <img src={deleteModalBtn} alt="Close delete modal" />
            </button>
          </div>
          <div className="delete__modal_title">
            <p> Are you sure you want to delete this item? </p>
            <p>This action is irreversible.</p>
          </div>

          <div className="delete__modal_buttons">
            <button className="delete__modal_confirm-btn" onClick={onConfirm}>
              Yes, delete item
            </button>
            <button className="delete__modal_cancel-btn" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
