import { useEffect } from "react";
import modalCloseBtn from "../../assets/modalCloseBtn.svg";
import "./Modal.css";

export const Modal = ({ name, onClose, children, isOpen }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal__overlay ${isOpen ? "modal__overlay_open" : ""}`}
      onMouseDown={handleOverlay}
    >
      <div
        className={`modal modal_type_${name} ${isOpen ? "modal__open" : ""}`}
      >
        <div className="modal__container">
          {children}

          <button className="modal__close" type="button" onClick={onClose}>
            <img src={modalCloseBtn} alt="Close modal" />
          </button>
        </div>
      </div>
    </div>
  );
};
