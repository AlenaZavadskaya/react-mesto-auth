import React from "react";
import Logo from "../images/logo.svg";

function Header() {
  return (
    <header className="header">
			<img className="header__logo" src={Logo} alt="логотип" />
			<div className="header__enter">
				{/* <p className="header__email">email@mail.com</p>
				<p className="header__auth">Выйти</p> */}
				<p className="header__auth">Войти</p>
			</div>
    </header>
  );
}

export default Header;
