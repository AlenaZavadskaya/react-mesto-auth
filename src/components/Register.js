import React, { useState } from "react";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <RegisterForm
      name="Register"
      id="form-register"
      title="Регистрация"
      isLoading={props.isLoading ? "Регистрация..." : "Зарегистрироваться"}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      Link={
        <Link to="/sign-in" className="form__request-auth">
          Уже зарегистрированны? Войти
        </Link>
      }
    >
      <label className="form__field form__field-email">
        <input
          id="email-input"
          className="form__item form__item_auth"
          type="text"
          placeholder="Email"
          minLength="2"
          maxLength="40"
          value={email}
          onChange={handleChangeEmail}
          required
        />
				<span id="name-input-error" className="form__item-error">{props.message}</span>
      </label>
      <label className="form__field form__field-password">
        <input
          id="password-input"
          className="form__item form__item_auth"
          type="text"
          placeholder="Пароль"
          minLength="2"
          maxLength="200"
          value={password}
          onChange={handleChangePassword}
          required
        />
				<span id="about-input-error" className="form__item-error">{props.message}</span>
      </label>
    </RegisterForm>
  );
}

export default Register;
