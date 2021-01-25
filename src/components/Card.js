import React from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = (props.card.owner._id || props.card.owner) === currentUser._id;
  const cardDeleteButtonClassName = `element__delete ${
    isOwn ? "element__delete-active" : ""
  }`;

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <li className="element">
      <img
        className="element__image"
        src={props.link}
        alt={props.name}
        card={props.card}
        onClick={handleCardClick}
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={handleDeleteClick}
        type="reset"
      />
      <div className="element__name">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__container"></div>
      </div>
    </li>
  );
}

export default Card;
