import iconEdit from "../images//icon-pen.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { CardsContext } from "../contexts/CardsContext";
import Header from "./Header";
import * as auth from "../utils/Auth.js";
import Footer from "./Footer";
function Main(props) {
  const [currentEmail, setCurrentEmail] = React.useState();
  const currentUser = React.useContext(CurrentUserContext);
  const currentCards = React.useContext(CardsContext);
  const jwt = localStorage.getItem("jwt");

  React.useEffect(() => {
    auth
      .getContent(jwt)
      .then((data) => {
        setCurrentEmail(data.data.email);
      })
      .catch((e) => {
        alert("Что-то пошло не так!");
      });
  }, []);

  return (
    <main>
      <Header link="/signin" linkText="Выйти" email={currentEmail} />
      <section className="profile">
        <div className="profile__edit-icon"
        onClick={props.onEditAvatar}
        >
          <img
            src={iconEdit}
            alt=""
            className="profile__edit-icon-image"
          />
        </div>
        <img
          src={currentUser.avatar}
          alt="Аватар профиля"
          className="profile__avatar"
        />
        <div className="profile__forms">
          <div className="profile__block-name">
            <p className="profile__form-name">{currentUser.name}</p>
            <button
              className="profile__edit-button"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__form-profession">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        {currentCards.map((card) => (
          <Card
            key={card._id}
            onCardClick={props.handleCardClick}
            card={card}
            id={currentUser._id}
            onCardLike={props.handleCardLike}
            onCardDelete={props.handleCardDelete}
          />
        ))}
      </section>
      <Footer />
    </main>
  );
}
export default Main;
