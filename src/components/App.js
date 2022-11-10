import "../App.css";
import React, { useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import Main from "./Main";
import PopupAvatar from "./PopupAvatar";
import PopupEditProfile from "./PopupEditProfile";
import PopupAddCard from "./PopupAddCard";
import ImagePopup from "./ImagePopup";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCard()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData);
        setCards(cardList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api
      .deleteСard(card._id)
      .then(() => {
        setCards((state) =>
          state.filter((c) => (c._id === card._id ? false : true))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api
      .postNewCard(data)
      .then((newCard) => {
        setCards([newCard, ...cards]);
      })
      .then(() => {
        closeAllpopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardClick(card) {
    setImagePopupOpen(true);
    setSelectedCard(card);
  }
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }
  function handleEditProfile() {
    setIsEditProfilePopupOpen(true);
  }
  function handleAddCard() {
    setIsAddPlacePopupOpen(true);
  }
  function closeAllpopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
    setImagePopupOpen(false);
  }
  function handleUpdateUser(data) {
    api
      .editProfile(data)
      .then((info) => {
        setCurrentUser(info);
        closeAllpopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleUpdateAvatar(data) {
    api
      .editAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllpopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfile}
            onAddPlace={handleAddCard}
            handleCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />
          <Footer />
          <PopupAvatar
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllpopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllpopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupAddCard
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllpopups}
            onAddPlace={handleAddPlaceSubmit}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            onClose={closeAllpopups}
            card={selectedCard}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
