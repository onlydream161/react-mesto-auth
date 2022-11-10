import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
function PopupAddCard({ isOpen, onClose, onAddPlace }) {
  const [placeName, setPlaceName] = React.useState("");
  const [link, setLink] = React.useState("");
  function handleChangePlaceName(evt) {
    setPlaceName(evt.target.value);
  }
  function handleChangeLink(evt) {
    setLink(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      placelink: link,
      nameplace: placeName,
    });}
    React.useEffect(()=>{
      setPlaceName("");
      setLink("")
    },[isOpen])
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="popup-cards"
      title="Новое Место"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input  popup__input_valve_place"
        placeholder="Название"
        required
        type="text"
        onChange={handleChangePlaceName}
        value={placeName || ""}
      />
      <span className="popup__error" id="nameplace-error"></span>
      <input
        className="popup__input  popup__input_valve_link"
        placeholder="Ссылка на картинку"
        required
        type="url"
        onChange={handleChangeLink}
        value={link || ""}
      />
      <span className="popup__error" id="placelink-error"></span>
    </PopupWithForm>
  );
}

export default PopupAddCard;
