import React, { useState, useEffect } from "react";
import RegisterForm from "./RegisterForm";

function Login(props) {
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
    if (!email || !password) {
      return;
    }
    props.onLogin(email, password);
  }

  useEffect(() => {
    if (props.loggedIn) {
      setEmail("");
      setPassword("");
    }
  }, [props.loggedIn]);

  return (
    <>
      <RegisterForm
        name="Enter"
        id="form-enter"
        title="Вход"
        isLoading={props.isLoading ? "Вход..." : "Войти"}
        isOpen={props.isOpen}
        onSubmit={handleSubmit}
      >
        <label className="form__field form__field-email">
          <input
            id="email-input"
            className="form__item form__item_auth"
            type="email"
            placeholder="Email"
            minLength="2"
            maxLength="40"
            value={email}
            onChange={handleChangeEmail}
            required
          />
          <span id="name-input-error" className="form__item-error">
            {props.message}
          </span>
        </label>
        <label className="form__field form__field-password">
          <input
            id="password-input"
            className="form__item form__item_auth"
            type="password"
            placeholder="Пароль"
            minLength="2"
            maxLength="200"
            value={password}
            onChange={handleChangePassword}
            required
          />
          <span id="about-input-error" className="form__item-error">
            {props.message}
          </span>
        </label>
      </RegisterForm>
    </>
  );
}

export default Login;
