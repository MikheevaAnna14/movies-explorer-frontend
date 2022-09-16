import React from "react";
import { useLocation } from "react-router-dom";
import './MoviesCard.css';

function MoviesCard (props) {
  const likeness = props.arraySavedMovies.some((movies) => {
    return movies.movieId === props.movie.id;
  });
  const location = useLocation();
  const imagePath = location.pathname.includes("/movies") ? `https://api.nomoreparties.co${props.image}` : props.image;
  const duration = props.duration >= 60 ? `${Math.floor(props.duration / 60)}ч. ${props.duration % 60}мин.` 
    : `${props.duration} мин.`;

  function handleClickButtonSaved() {
    props.onClick(props.movie, likeness);
  }

  function handleClickButtonDelete() {
    props.onClickButtonDelete(props.movie);
  }

  return(
    <div className="card" >
      <a href={props.trailer} target="_blanc">
        <img src={imagePath} className="card__image" alt="постер к фильму"></img>
      </a>
      <div className="card__info">
        <h2 className="card__title">{props.name}</h2>
        {(props.buttonDelete ? 
          <button type="button" className="card__button card__button_delete" onClick={handleClickButtonDelete}/> 
          :
          <button type="button" className={!likeness ? "card__button" : "card__button card__button_active"} 
            onClick={handleClickButtonSaved}/>
        )}
      </div>
      <span className="card__duration">{duration}</span>
    </div>
  )
}

export default MoviesCard;
