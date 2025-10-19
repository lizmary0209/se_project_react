import "./ItemModal.css";
import previewClose from "../../assets/previewClose.svg";

function ItemModal({ activeModal, onClose, card, openConfirmationModal }) {
  const isOpen = activeModal === "preview";

  if (!isOpen) return null;

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`modal ${isOpen ? "modal__open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__content">
          <button
            onClick={onClose}
            type="button"
            className="modal__close"
            aria-label="Close preview modal"
          >
            <img src={previewClose} alt="Close preview modal" />
          </button>
          <img src={card.link} alt={card.name} className="modal__image" />
          <div className="modal__footer">
            <div className="modal__footer-text">
              <h2 className="modal__caption">{card.name}</h2>
              <p className="modal__weather">Weather: {card.weather}</p>
            </div>
            <button
              className="modal__delete-button"
              onClick={() => openConfirmationModal(card)}
            >
              Delete item
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
