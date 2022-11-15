import React from "react";
import logoOk from "../../src/images/logo_ok.svg";
import logoNotOk from "../../src/images/logo_not_ok.svg";

function InformationPopup({ isInfo, isOpen, onClose }) {
  return (
    <div className={`popup   ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <img
          className="popup__logo"
          alt="logo"
          src={isInfo ? logoOk : logoNotOk}
        />
        <h2 className="popup__title popup__title_ok">
          {isInfo
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button
          className="popup__button-close"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default InformationPopup;
