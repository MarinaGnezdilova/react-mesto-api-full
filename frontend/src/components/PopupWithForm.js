function PopupWithForm(props) {
  return (
    <section
      className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <h2 className="popup__title">{props.title}</h2>

        <form
          className={`popup__form ${props.name}__form`}
          name={`${props.name}`}
          onSubmit={props.onSubmit}
        >
          {props.children}

          <button
            className={`popup__button ${props.name}__button`}
            type="submit"
          >
            Сохранить
          </button>
        </form>
        <button
          className={`popup__button-close ${props.name}__button-close`}
          type="button"
          onClick={props.onClose}
        ></button>
      </div>
    </section>
  );
}

export default PopupWithForm;
