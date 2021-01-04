import React from "react";
import currentUserContext from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup(props) {
  const currentUser = React.useContext(currentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");

  React.useEffect(() => {
    if (currentUser.name !== undefined) {
      setName(currentUser.name);
      setDescription(currentUser.about);
    }
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name="popupProfile"
      id="form-edit"
      title="Редактировать профиль"
      isLoading={props.isLoading ? "Сохранение..." : "Сохранить"}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <label className="form__field">
        <input
          id="name-input"
          className="form__item form__item_name"
          type="text"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          value={name}
          onChange={handleChangeName}
          required
        />
        <span id="name-input-error" className="form__item-error" />
      </label>
      <label className="form__field form__field-info">
        <input
          id="about-input"
          className="form__item form__item_about"
          type="text"
          placeholder="О себе"
          minLength="2"
          maxLength="200"
          value={description}
          onChange={handleChangeDescription}
          required
        />
        <span id="about-input-error" className="form__item-error" />
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
