function ImagePopup(props) {
  return (
    <section
      className={`popup popup-picture  ${
        props.card.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup-picture__container">
        <button
          className="popup__button-close popup-picture__button-close"
          type="button"
          onClick={props.onClose}
        ></button>
        <img
          src={props.card.link}
          alt="Изображение карточки"
          className="popup-picture__image"
        />
        <h2 className="popup-picture__title">{props.card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
