import iconDelete from "../images//delete-icon.svg";
function Card(props) {
  const isOwn = props.id === props.card.owner._id;
  const cardDeleteButtonClassName = `elements__delete-icon ${
    isOwn ? " " : "elements__delete-icon_hidden"
  }`;
  const isLiked = props.card.likes.some((i) => i._id === props.id);
  const cardLikeButtonClassName = `button-like ${
    isLiked ? "button-like_status_active" : " "
  }`;
  function handleClick() {
    props.onCardClick(props.card);
  }
  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteclick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="elements__element">
      <img
        alt="Изображение места"
        className="elements__photo"
        src={props.card.link}
        onClick={handleClick}
      />
      <img
        src={iconDelete}
        alt="Удаление"
        className={cardDeleteButtonClassName}
        onClick={handleDeleteclick}
      />
      <div className="elements__element-footer">
        <h2 className="elements__title">{props.card.name}</h2>
        <div className="elements__block-like">
          <button
            className={cardLikeButtonClassName}
            type="button"
            onClick={handleLikeClick}
          ></button>
          <p className="elements__amount-like">{props.card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}
export default Card;
