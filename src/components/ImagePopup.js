import React from "react";

function ImagePopup(props) {
  const openedPopupSelector = props.card.link ? "popup_opened" : "";
  return (
    <section className={`popup popup-image ${openedPopupSelector}`}>
      <div className="popup-image__container">
        <button
          className="popup__close popup-image__close"
          type="button"
          onClick={props.onClose}
        />
        <figure>
          <img
            className="popup-image__img"
            src={props.card.link}
            alt={props.card.name}
          />
          <figcaption className="popup-image__title">
            {props.card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
