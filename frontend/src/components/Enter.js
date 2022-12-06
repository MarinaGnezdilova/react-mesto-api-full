function Enter(props) {
  return (
    <div className="enter">
      <h1 className="enter__title ">{props.title}</h1>
      <input className="enter__input" placeholder="Email" />
      <input className="enter__input" placeholder="Пароль" />
      <button className="enter__button">{props.textButton}</button>
    </div>
  );
}

export default Enter;
