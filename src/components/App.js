import React, { useState, useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import * as auth from "../utils/auth";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import InfoTooltip from "./InfoTooltip";
import PopupWithForm from "./PopupWithForm";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";
import Login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [cardForDelete, setCardForDelete] = useState();
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loggedIn, setloggedIn] = useState(false);
  const [dataUser, setDataUser] = useState({});
  const [message, setMessage] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const history = useHistory();

  useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser({
          name: userData.name,
          about: userData.about,
          avatar: userData.avatar,
          _id: userData._id,
        });
        setCards(initialCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }, []);

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setloggedIn(true);
            setDataUser({
              email: res.data.email,
            });
            history.push("/");
          } else {
            localStorage.removeItem("jwt");
          }
        })
        .catch((err) => {
          console.log(`Переданный токен некорректен или просрочен: ${err}`);
        });
    }
    // eslint-disable-next-line
  }, []);



  function handleRegister(email, password) {
    setIsLoading(true);
    auth
      .register(email, password)
      .then((res) => {
        if (res) {
          if (res.data) {
            setIsLoading(false);
            setMessage("");
            handleRegisterSuccess(true);
            handleInfoTooltipPopup();
            history.push("/sign-in");
          }
        }
      })
      .catch((err) => {
        setMessage("Ошибка при регистрации");
        handleRegisterSuccess(false);
        handleInfoTooltipPopup();
        if (err === 400) {
          return console.log(`Некорректно заполнено одно из полей : ${err}`);
        }

        console.log(`Ошибка: ${err}`);
      });
  }

  function handleRegisterSuccess(value) {
    setRegisterSuccess(value);
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    auth
      .authorize(email, password)
      .then((data) => {
        if (!data) {
          setMessage("Что-то пошло не так.");
          return false;
        }
        if (data) {
          setIsLoading(false);
          localStorage.setItem("jwt", data.token);
          setMessage("");
          setDataUser({
            email: data.email,
            password: data.password,
          });
          setloggedIn(true);
          history.push("/");
          return loggedIn;
        }
      })
      .catch((err) => {
        setMessage("Ошибка при авторизации.");
        handleRegisterSuccess(false);
        handleInfoTooltipPopup();
        if (err === 401) {
          return console.log(`Пользователь с таким email не найден: ${err}`);
        }
        if (err === 400) {
          return console.log(`Не передано одно из полей: ${err}`);
        }
        console.log(`Ошибка: ${err}`);
      });
  }

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setloggedIn(false);
    history.push("/sign-in");
  };

  function handleAddPlaceSubmit(card) {
    setIsLoading(true);
    api
      .addCards(card)
      .then((newCard) => {
        setIsLoading(false);
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleCardDeleteRequest(card) {
    setCardForDelete(card);
    setIsDeleteCardPopupOpen(true);
  }

  function handleCardDelete(evt) {
    evt.preventDefault();
    setIsLoading(true);
    api
      .deleteCard(cardForDelete)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== cardForDelete._id);
        setIsLoading(false);
        setIsDeleteCardPopupOpen(false);
        setCards(newCards);
      })
      .catch((err) => console.log(`При удалении карточки: ${err}`));
  }

  function handleUpdateUser(currentUser) {
    setIsLoading(true);
    api
      .setUserInfo(currentUser)
      .then((userData) => {
        setIsLoading(false);
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleUpdateAvatar(currentUser) {
    setIsLoading(true);
    api
      .setUserAvatar(currentUser)
      .then((userData) => {
        setIsLoading(false);
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(`Ошибка: ${err}`);
      });
  }

  function handleProfilePopup() {
    setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handlePlacePopupOpen() {
    setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function handleAvatarPopupOpen() {
    setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleInfoTooltipPopup() {
    setIsInfoTooltipOpen(!isInfoTooltipOpen);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen();
    setIsAddPlacePopupOpen();
    setIsEditAvatarPopupOpen();
    setIsDeleteCardPopupOpen(false);
    setCardForDelete(undefined);
    setSelectedCard({});
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    function handleESCclose(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }

    document.addEventListener("keydown", handleESCclose);
    return () => {
      document.removeEventListener("keydown", handleESCclose);
    };
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header onSignOut={handleSignOut} email={dataUser.email} />
      <Switch>
        <ProtectedRoute
          exact
          path="/"
          loggedIn={loggedIn}
          component={Main}
          onEditProfile={handleProfilePopup}
          onEditAvatar={handleAvatarPopupOpen}
          onAddPlace={handlePlacePopupOpen}
          onCardClick={setSelectedCard}
          name={currentUser.name}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDeleteRequest}
          cards={cards}
        ></ProtectedRoute>
        <Route path="/sign-up">
          <Register
            onRegister={handleRegister}
            message={message}
            isLoading={isLoading}
          />
        </Route>
        <Route path="/sign-in">
          <Login
            onLogin={handleLogin}
            message={message}
            loggedIn={loggedIn}
            isLoading={isLoading}
          />
        </Route>
			</Switch>
			{loggedIn && <Footer />}
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
        isLoading={isLoading}
      />
      <InfoTooltip
        isOpen={isInfoTooltipOpen}
        onClose={closeAllPopups}
        isSuccess={registerSuccess}
      />
      <PopupWithForm
        isOpen={isDeleteCardPopupOpen}
        title="Вы уверены?"
        name="remove-card"
        isLoading={isLoading ? "Удаление..." : "Да"}
        onSubmit={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
