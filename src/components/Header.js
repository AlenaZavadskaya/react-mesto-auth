import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Logo from "../images/logo.svg";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={Logo} alt="логотип" />
      <div className="header__enter">
        <Switch>
          <Route path="/sign-up">
            <Link to="./sign-in" className="header__auth">
              Войти
            </Link>
          </Route>
          <Route path="/sign-in">
            <Link to="./sign-up" className="header__auth">
              Регистрация
            </Link>
          </Route>
          <Route path="/">
            <p className="header__email">{props.email}</p>
            <p className="header__auth" onClick={props.onSignOut}>
              Выйти
            </p>
          </Route>
        </Switch>
      </div>
    </header>
  );
}

export default Header;
