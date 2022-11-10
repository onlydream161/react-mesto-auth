import React from "react";

function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup page__popup-foto ${isOpen && "popup_opened"}`}>
      <div className="popup__foto-container">
        <img className="popup__foto-image" src={card.link} alt={card.name} />
        <p className="popup__foto-name">{card.name}</p>
        <button
          className="popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}
export default ImagePopup;
