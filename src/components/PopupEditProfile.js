import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function PopupEditProfile({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  const currentUser = React.useContext(CurrentUserContext);
  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(evt) {
    setName(evt.target.value);
  }
  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      name="popup-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input  popup__input_valve_name"
        required
        type="text"
        name="name"
        onChange={handleChangeName}
        value={name || ""}
      />
      <span className="popup__error" id="firstname-error"></span>
      <input
        className="popup__input   popup__input_valve_job"
        required
        type="text"
        onChange={handleChangeDescription}
        value={description || ""}
      />
      <span className="popup__error" id="job-error"></span>
    </PopupWithForm>
  );
}

export default PopupEditProfile;
