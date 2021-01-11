import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
		});
		avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      name="popupAvatar"
      id="form-avatar"
      title="Обновить аватар"
      isLoading={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field form__field-info">
        <input
          id="url-input"
          className="form__item form__item_avatar form__item_link"
          type="url"
          name="link"
          placeholder="Ссылка на картинку"
          ref={avatarRef}
          required
        />
        <span id="url-input-error" className="form__item-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
