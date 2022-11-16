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
import { Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import { authApi } from "../utils/Auth";
import InformationPopup from "./InformationPopup";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isInfo, setIsInfo] = React.useState(false);
  const [emailUser, setEmailUser] = React.useState("");
  const [isInformPopup, setIsInformPopup] = React.useState(false);
  const navigate = useNavigate();
  const checkToken = () => {
    const token = localStorage.getItem("jwt");
    if (token) {
      authApi
        .getToken(token)
        .then((res) => {
          setEmailUser(res.data.email);
          setLoggedIn(true);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      navigate("/sign-in");
    }
  };
  useEffect(() => {
    checkToken();
    navigate("/");
  }, [loggedIn]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCard()])
      .then(([userData, cardList]) => {
        if (loggedIn) {
          setCurrentUser(userData);
          setCards(cardList);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [loggedIn]);

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
    setIsInformPopup(false);
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
  function handleRegisterSubmit(evt, { email, password }) {
    evt.preventDefault();
    authApi
      .signUp({ email, password })
      .then((res) => {
        if (res) {
          setIsInformPopup(true);
          setIsInfo(true);
          navigate("/sign-in");
        }
      })
      .catch((err) => {
        console.log(err);
        setIsInformPopup(true);
        setIsInfo(false);
      });
  }
  function handleAuthSubmit(evt, { email, password }) {
    evt.preventDefault();
    authApi
      .signIn({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
        } else {
          setLoggedIn(false);
        }
      })
      .catch((err) => {
        setIsInfo(false);
        setIsInformPopup(true);
        console.log(err);
      });
  }
  function handleAuthOut() {
    setLoggedIn(false);
    localStorage.removeItem("jwt");
    setEmailUser(null);
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header
            loggedIn={loggedIn}
            onClick={handleAuthOut}
            emailUser={emailUser}
          />
          <Routes>
            <Route
              exact
              path="/"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Main
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfile}
                    onAddPlace={handleAddCard}
                    handleCardClick={handleCardClick}
                    cards={cards}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              exact
              path="/sign-up"
              element={<Register onSubmit={handleRegisterSubmit} />}
            />
            <Route
              exact
              path="/sign-in"
              element={<Login onSubmit={handleAuthSubmit} />}
            />
          </Routes>
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
          <InformationPopup
            isOpen={isInformPopup}
            isInfo={isInfo}
            onClose={closeAllpopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
