import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({ isOpen, onConfirm, onCancel }) {
  if (!isOpen) return null;

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onClick={onCancel}
    >
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal__content">
          <p className="modal__title">
            Are you sure you want to delete this item?{" "}
          </p>
          <p>This action is irreversible.</p>
          <div className="modal__buttons">
            <button className="modal__cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button className="modal__confirm-btn" onClick={onConfirm}>
              Yes, delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
