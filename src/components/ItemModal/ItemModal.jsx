import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./ItemModal.css";
import previewClose from "../../assets/previewClose.svg";

function ItemModal({ activeModal, onClose, card, openConfirmationModal }) {
  const currentUser = useContext(CurrentUserContext);
  const ownerId = card?.owner?._id || card?.owner;
  const isOpen = activeModal === "preview";

  const isOwn = Boolean(currentUser?._id && ownerId === currentUser._id);

  if (!isOpen) return null;

  return (
    <div
      className={`item__modal_overlay ${
        isOpen ? "item__modal_overlay_open" : ""
      }`}
      onClick={onClose}
    >
      <div
        className={`item__modal ${isOpen ? "item__modal_open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="item__modal_content">
          <button
            onClick={onClose}
            type="button"
            className="item__modal_close"
            aria-label="Close preview modal"
          >
            <img src={previewClose} alt="Close preview modal" />
          </button>
          <img
            src={card.imageUrl}
            alt={card.name}
            className="item__modal_image"
          />
          <div className="item__modal_footer">
            <div className="item__modal_footer-text">
              <h2 className="item__modal_caption">{card.name}</h2>
              <p className="item__modal_weather">Weather: {card.weather}</p>
            </div>

            {isOwn && (
              <button
                className="item__modal_delete-button"
                onClick={() => openConfirmationModal(card)}
                type="button"
              >
                Delete item
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
