function PopupWithForm({
  name,
  title,
  children,
  onClose,
  isOpen,
  buttonText,
  onSubmit,
}) {
  return (
    <div className={`popup page__${name} ${isOpen && "popup_opened"}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title} </h2>
        <form
          className={`popup__form  popup__form_${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button className="popup__button-save " type="submit">
            {buttonText}
          </button>
        </form>
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
export default PopupWithForm;
