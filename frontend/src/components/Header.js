import { Link } from "react-router-dom";
import logo from "../images/logo.svg";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import React from "react";
function Header(props) {
  const {setLoggedIn} = React.useContext(CurrentUserContext);
  const history = useHistory();
  function signOut() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/login");
  }
  return (
    <header className="header">
      <img src={logo} alt="Логотип" className="header__logo" />
      <div className="header__login-block">
      <p className="header__email">{props.email}</p>
      <Link onClick={signOut} to={props.link} className="header__link">
        {props.linkText}
      </Link>
      </div>

    </header>
  );
}
export default Header;
