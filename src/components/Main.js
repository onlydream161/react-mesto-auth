import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

import Card from "./Card";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  handleCardClick,
  cards,
  onCardLike,
  onCardDelete,
}) {
  const currentUser = React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile page__profile">
        <div className="page__image-container" onClick={onEditAvatar}>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="фото профиля"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__editor"
            type="button"
            onClick={onEditProfile}
          />
          <p className="profile__caption">{currentUser.about}</p>
        </div>

        <button
          className="profile__card-button"
          aria-label="Добавить карточку"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>

      <section className="elements page__elements">
        <ul className="places">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}
export default Main;
