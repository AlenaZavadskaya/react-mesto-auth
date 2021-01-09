import React from "react";

function RegisterForm(props) {
  return (
    <section
      id={props.name}
    >
        <form
          className="form"
          id={props.id}
          onSubmit={props.onSubmit}
          noValidate
        >
          <div className="form__container form__container_auth">
            <h2 className="form__heading form__heading_auth">{props.title}</h2>
            <fieldset className="form__input-container">
              {props.children}
              <div className="form__handlers">
                <button className="submit__button submit__button_auth" type="submit">
                  {props.isLoading}
							</button>

              </div>
					</fieldset>
					{props.Link}
					{/* <Link to="/sign-in" className="form__request-auth">
        Уже зарегистрированны? Войти
      </Link> */}
          </div>
        </form>
    </section>
  );
}

export default RegisterForm;
