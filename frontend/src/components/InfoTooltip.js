function InfoTooltip(props) {
    return (
     <section className={`popup ${props.name} ${props.isOpen ? "popup_opened" : ""}`}>
    <div className={`popup__container ${props.name}__container`}>
        <div className={`${props.name}__image`}></div>
        <h2 className={`popup__title ${props.name}__title`}>{props.title}</h2>
        <button
          className={`popup__button-close ${props.name}__button-close`}
          type="button"
          onClick={props.onClose}
        ></button>

    </div>
     </section>


    );
  }
  export default InfoTooltip;