import React from "react";

function InfoTooltip(props) {
	// проверяет нажатие esc
	if (props.isOpen) {
		window.addEventListener('keydown', (evt) => handleEscClose(evt))
}
function closeReset() {
		props.onClose()
		window.removeEventListener('keydown', handleEscClose)
}
// закрывает при нажатии esc
function handleEscClose(evt) {
		if (evt.key === 'Escape') {
				closeReset()
		}
}
// закрывает попап при нажатии на фон
function closePopupByClickingOverlay(event) {
		if (event.target === event.currentTarget) {
				closeReset()
		}
}
  return (
    <section
      className={`popup ${props.isOpen ? "popup_opened" : ""}`}
      id="popupInfo"
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={props.onClose}
        />
        {props.isSuccess ? (
          <>
            <div className="popup__img" />
            <h2 className="form__heading form__heading_infoTooltip">
              Вы успешно зарегистрировались!
            </h2>
          </>
        ) : (
				<>
				<div className="popup__img popup__img_fail" />
            <h2 className="form__heading form__heading_infoTooltip">
						Что-то пошло не так. Попробуйте ещё раз!
            </h2>
          </>
        )}
      </div>
    </section>
  );
}

export default InfoTooltip;
