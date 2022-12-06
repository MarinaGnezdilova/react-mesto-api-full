import PopupWithForm from "./PopupWithForm";
import React from "react";
function AddPlacePopup(props) {
  const [nameCard, setNameCard] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeNameCard(e) {
    setNameCard(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddCard({
      name: nameCard,
      link,
    });
  }

  React.useEffect(() => {
    setNameCard("");
    setLink("");
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="new-place"
      title="Новое место"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      children={
        <>
          <div className="popup__input-block">
            <input
              type="text"
              id="name-card"
              value={nameCard || ""}
              onChange={handleChangeNameCard}
              className="popup__form-field new-place-form-field-placename"
              name="name"
              placeholder="Название"
              minLength="2"
              maxLength="30"
              required
            />
            <span className="error" id="name-card-error">
              Ошибка
            </span>
          </div>

          <div className="popup__input-block">
            <input
              type="url"
              value={link || ""}
              onChange={handleChangeLink}
              id="link"
              className="popup__form-field new-place-form-field-picture"
              name="link"
              placeholder="Ссылка на картинку"
              required
            />
            <span className="error" id="link-error">
              Ошибка
            </span>
          </div>
        </>
      }
    />
  );
}

export default AddPlacePopup;
