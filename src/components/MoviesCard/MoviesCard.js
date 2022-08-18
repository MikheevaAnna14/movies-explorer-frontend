import React, { useState } from "react";

import './MoviesCard.css';
import filmImage from '../../images/film1.jpg';

function MoviesCard (props) {
  const [isSaved, setIsSaved] = useState(false);

  function handleClickSaved() {
    if(!isSaved) {
      setIsSaved(true);
    } else {
      setIsSaved(false);
    }  
  }

  return(
    <div className="card">
      <img src={filmImage} className="card__image" alt="постер к фильму"></img>
      <div className="card__info">
        <h2 className="card__title">33 слова о дизайне</h2>
        {(props.buttonDelete ? 
          <button type="button" className="card__button card__button_delete" /> 
          :
          <button type="button" className={!isSaved ? "card__button" : "card__button card__button_active"}  onClick={handleClickSaved}/>
        )}
      </div>
      <span className="card__duration">1ч42м</span>

    </div>
  )
}

export default MoviesCard;
