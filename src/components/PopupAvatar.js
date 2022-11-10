import PopupWithForm from "./PopupWithForm";
import React, { useEffect } from "react";
function PopupAvatar({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef("");
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }
  useEffect(() => {
    avatarRef.current.value = "";
  }, [onClose]);
  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="popup-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input   popup__input_valve_link"
        required
        placeholder="Ссылка на аватар"
        type="url"
        name="avatarlink"
        minLength="2"
        maxLength="200"
        ref={avatarRef}
      />
      <span className="popup__error" id="avatarlink-error"></span>
    </PopupWithForm>
  );
}
export default PopupAvatar;
