import PopupWithForm from "./PopupWithForm";
import React from "react";
function EditAvatarPopup(props) {
  const [avatar, setAvatar] = React.useState("");
  const currentAvatar = React.useRef(null);

  function handleChange(e) {
    setAvatar(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: currentAvatar.current,
    });
    setAvatar("");
  }
  return (
    <PopupWithForm
      name="popup-edit-avatar"
      title="Обновить аватар"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__input-block">
            <input
              type="url"
              value={avatar || ""}
              onChange={handleChange}
              ref={currentAvatar}
              id="link-avatar"
              className="popup__form-field popup-edit-avatar__field-picture"
              name="link"
              placeholder="Ссылка на аватар"
              required
            />
            <span className="error" id="link-avatar-error">
              Ошибка
            </span>
          </div>
        </>
      }
    />
  );
}

export default EditAvatarPopup;
