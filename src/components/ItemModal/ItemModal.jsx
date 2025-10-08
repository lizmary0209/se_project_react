import "./ItemModal.css";
import previewClose from "../../assets/previewClose.svg";

function ItemModal({ activeModal, onClose, card }) {
  const isOpen = activeModal === "preview";

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onClick={onClose}
    >
      <div
        className={`modal ${isOpen ? "modal__open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__content modal__content_type_image">
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
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
