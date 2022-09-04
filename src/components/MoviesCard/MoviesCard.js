import React from "react";

import './MoviesCard.css';

function MoviesCard (props) {
  // const [isSaved, setIsSaved] = useState(false);

  function handleClickButtonSaved() {
    props.onClick(props.movie)
  }

  return(
    <div className="card" >
      <a href={props.trailer} target="_blanc">
        <img src={`https://api.nomoreparties.co${props.image}`} className="card__image" alt="постер к фильму"></img>
      </a>
      <div className="card__info">
        <h2 className="card__title">{props.name}</h2>
        {(props.buttonDelete ? 
          <button type="button" className="card__button card__button_delete" /> 
          :
          <button type="button" className={!props.isLiked ? "card__button" : "card__button card__button_active"}  onClick={handleClickButtonSaved}/>
        )}
      </div>
      <span className="card__duration">{props.duration} мин.</span>
    </div>
  )
}

export default MoviesCard;
