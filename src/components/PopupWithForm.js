import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id={props.name}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        <form
          className="form"
          id={props.id}
          onSubmit={props.onSubmit}
          noValidate
        >
          <div className="form__container">
            <h2 className="form__heading">{props.title}</h2>
            <fieldset className="form__input-container">
              {props.children}
              <div className="form__handlers">
                <button className="submit__button" type="submit">
                  {props.isLoading}
                </button>
              </div>
            </fieldset>
          </div>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
