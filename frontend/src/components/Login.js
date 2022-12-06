import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import * as auth from "../utils/Auth.js";
import Header from "./Header.js";
import InfoTooltip from "./InfoTooltip.js";
function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [isLoginFailed, setIsLoginFailed] = useState(false);

  function onLoginFailedPopupClosed() {
    setIsLoginFailed(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    auth
      .authorize(email, password)
      .then((data) => {
        const token = data.token;
        localStorage.setItem("jwt", token);
        history.push("/");
      })
      .catch((e) => {
        setIsLoginFailed(true);
      });
  }

  return (
    <div>
      <InfoTooltip
        name="popup-fail-register"
        title="Что-то пошло не так!
                Попробуйте ещё раз."
        onClose={onLoginFailedPopupClosed}
        isOpen={isLoginFailed}
      />
      <Header link="/signup" linkText="Регистрация" />
      <div className="enter">
        <h1 className="enter__title ">Вход</h1>
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
            Войти
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
