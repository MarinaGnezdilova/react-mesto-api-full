import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
function EditProfilePopup(props) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

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
      name="popup-profile"
      title="Редактировать профиль"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__input-block">
            <input
              type="text"
              value={name || ""}
              onChange={handleChangeName}
              id="profile-name"
              className="popup__form-field popup__form-field-name"
              name="name"
              minLength="2"
              maxLength="40"
              required
            />
            <span className="error" id="profile-name-error"></span>
          </div>

          <div className="popup__input-block">
            <input
              type="text"
              value={description || ""}
              onChange={handleChangeDescription}
              id="job"
              className="popup__form-field popup__form-field-job"
              name="about"
              minLength="2"
              maxLength="200"
              required
            />
            <span className="error" id="job-error"></span>
          </div>
        </>
      }
    />
  );
}
export default EditProfilePopup;
