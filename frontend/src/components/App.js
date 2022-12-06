/*import "../index.css";*/
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import React from "react";
import {
  Route,
  Switch,
  useHistory,
  BrowserRouter as Router,
} from "react-router-dom";
import { api } from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import * as auth from "../utils/Auth.js";
function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [currentCards, setCards] = React.useState([]);
  const [isSuccessRegister, setIsSuccessRegister] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth1(jwt);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      history.push("/");
    }
  }, [loggedIn]);

  const auth1 = (jwt) => {
    return auth
      .getContent(jwt)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((e) => {
        alert("Что-то пошло не так!");
      });
  };

  React.useEffect(() => {
    api
      .getInfoUser()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((e) => {
        alert("Не удалось получить данные пользователя");
      });
  }, []);

  React.useEffect(() => {
    api
      .getCards()
      .then((res) => {
        setCards(res);
      })
      .catch((e) => {
        alert("Не удалось загрузить карточки");
      });
  }, []);

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsSuccessRegister(false);
    setSelectedCard({});
  }

  function handleUpdateUser(formData) {
    api
      .editProfile(formData)
      .then((formData) => {
        setCurrentUser(formData);
        closeAllPopups();
      })
      .catch((e) => {
        alert("Не удалось отредактировать профиль");
      });
  }

  function handleUpdateAvatar(avatar) {
    api
      .changeAvatar(avatar.avatar.value)
      .then((avatar) => {
        setCurrentUser(avatar);
        closeAllPopups();
      })
      .catch((e) => {
        alert("Не удалось изменить аватар");
      });
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((e) => {
        alert("Не удалось загрузить карточки");
      });
  }

  function handleAddCard(formData) {
    api
      .addCard(formData)
      .then((newCard) => {
        setCards([newCard, ...currentCards]);
        closeAllPopups();
      })
      .catch((e) => {
        alert("Не удалось добавить карточку");
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((e) => {
        alert("Не удалось сменить статус лайка");
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CardsContext.Provider value={currentCards}>
        <div className="root">
          <div className="page">
            <ImagePopup onClose={closeAllPopups} card={selectedCard} />
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <PopupWithForm name="popup-delete-card" title="Вы уверены?" />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddCard={handleAddCard}
            />

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <Switch>
              <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                component={Main}
                handleCardDelete={handleCardDelete}
                handleCardLike={handleCardLike}
                onEditAvatar={() => {
                  setIsEditAvatarPopupOpen(!isEditAvatarPopupOpen);
                }}
                onAddPlace={() => {
                  setIsAddPlacePopupOpen(!isAddPlacePopupOpen);
                }}
                onEditProfile={() => {
                  setIsEditProfilePopupOpen(!isEditProfilePopupOpen);
                }}
                handleCardClick={(card) => {
                  setSelectedCard(card);
                }}
                onSetCards={(cards) => {
                  setCards(cards);
                }}
              />

              <Route path="/signup">
                <Register />
              </Route>

              <Route path="/signin">
                <Login />
              </Route>
            </Switch>
          </div>
        </div>
      </CardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
