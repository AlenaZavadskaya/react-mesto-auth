import React from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import api from "../utils/Api";
import currentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import PopupWithForm from "./PopupWithForm";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(
    false
  );
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({});
  const [cardForDelete, setCardForDelete] = React.useState();
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    Promise.all([api.getUserData(), api.getInitialCards()])
      .then((values) => {
        const [userData, initialCards] = values;
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

  function closeAllPopups() {
    setIsEditProfilePopupOpen();
    setIsAddPlacePopupOpen();
    setIsEditAvatarPopupOpen();
    setIsDeleteCardPopupOpen(false);
    setCardForDelete(undefined);
    setSelectedCard({});
  }

  React.useEffect(() => {
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
    <currentUserContext.Provider value={currentUser}>
      <Header />
      <Main
        onEditProfile={handleProfilePopup}
        onEditAvatar={handleAvatarPopupOpen}
        onAddPlace={handlePlacePopupOpen}
        onCardClick={setSelectedCard}
        name={currentUser.name}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDeleteRequest}
        cards={cards}
      />
      <Footer />
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
      <PopupWithForm
        isOpen={isDeleteCardPopupOpen}
        title="Вы уверены?"
        name="remove-card"
        isLoading={isLoading ? "Удаление..." : "Да"}
        onSubmit={handleCardDelete}
      />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />
    </currentUserContext.Provider>
  );
}

export default App;
