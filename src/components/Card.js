import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  function handleCardClick() {
    onCardClick(card);
  }
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const cardDeleteButtonClassName = `places__trash ${
    isOwn ? "" : "places__trash_hidden"
  }`;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `places__like-button ${
    isLiked ? "places__like-button_active" : ""
  }`;
  function handleLikeClick() { onCardLike(card);
  }
  function handleDeleteCardClick() {
    onCardDelete(card);
  }
  return (
    <>
      <li className="places__card">
        <button
          className="places__image-button"
          type="button"
          aria-label="открыть фото"
          onClick={handleCardClick}
        >
          <img className="places__image" src={card.link} alt={card.name} />
        </button>
        <div className="places__caption">
          <h2 className="places__name">{card.name}</h2>
          <div className="places__like">
            <button
              className={cardLikeButtonClassName}
              onClick={handleLikeClick}
              type="button"
            ></button>
            <p className="places__like-sum">{card.likes.length}</p>
          </div>
        </div>
        <button
          className={cardDeleteButtonClassName}
          onClick={handleDeleteCardClick}
          type="button"
        ></button>
      </li>
    </>
  );
}
export default Card;
