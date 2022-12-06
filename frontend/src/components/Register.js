import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import * as auth from "../utils/Auth.js";
import InfoTooltip from "./InfoTooltip.js";
import Header from "./Header.js";
function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [isRegisterCompleted, setIsRegisterCompleted] = React.useState(false);
  const [isRegisterFailed, setIsRegisterFailed] = React.useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    auth.register(email, password).then((response) => {
      if (response.status === 400) {
        setIsRegisterFailed(true);
      } else {
        setIsRegisterCompleted(true);
      }
    })
    .catch((e) => {
      alert('Что-то пошло не так!')
    })
  }

  function onRegisterCompletedPopupClosed() {
    history.push("/signin");
    setIsRegisterCompleted(false);
  }

  function onRegisterFailedPopupClosed() {
    setIsRegisterFailed(false);
    setIsRegisterCompleted(false);
  }

  return (
    <div>
      <Header link="/signin" linkText="Войти" />
      <div className="enter">
        <InfoTooltip
          name="popup-success-register"
          title="Вы успешно зарегистрировались!"
          onClose={onRegisterCompletedPopupClosed}
          isOpen={isRegisterCompleted}
        />

        <InfoTooltip
          name="popup-fail-register"
          title="Что-то пошло не так!
                Попробуйте ещё раз."
          onClose={onRegisterFailedPopupClosed}
          isOpen={isRegisterFailed}
        />

        <h1 className="enter__title ">Регистрация</h1>
        <form onSubmit={handleSubmit} className="enter__form">
          <input
            className="enter__input"
            placeholder="Email"
            name="email"
            type="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            className="enter__input"
            placeholder="Пароль"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          <button type="submit" className="enter__button">
            Зарегистрироваться
          </button>
        </form>
        <Link to="/signin" className="enter__link">
          Уже зарегистрированы? Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;
