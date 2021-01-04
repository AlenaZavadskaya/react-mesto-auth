import React from "react";
import currentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
	const currentUser = React.useContext(currentUserContext);

	const isOwn = props.card.owner._id === currentUser._id;
	const cardDeleteButtonClassName = (
		`element__delete ${isOwn ? 'element__delete-active' : ''}`
		);
		
	const isLiked = props.card.likes.some(i => i._id === currentUser._id);
	const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;
	

	function handleCardClick() {
    props.onCardClick(props.card);
	}

	function handleLikeClick() {
		props.onCardLike(props.card);
	}

	function handleDeleteClick() {
		props.onCardDelete(props.card);
	}
	
  return (
    <li className="element" key={props.card._id}>
      <img
        className="element__image"
        style={{ backgroundImage: `url(${props.link})` }}
        src={props.link}
        alt={props.name}
        card={props.card}
        onClick={handleCardClick}
      />
      <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="reset" />
      <div className="element__name">
        <h2 className="element__title">{props.name}</h2>
        <div className="element__container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} key={props.id} type="button" />
          <div className="element__counter">{props.likes.length}</div>
        </div>
      </div>
    </li>
  );
}

export default Card;
