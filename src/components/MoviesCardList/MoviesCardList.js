import React from "react";

import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList (props) {
  return(
    <section className="card-list">
      {/* карточки будут рендериться из массива, загруженного с сайта BF */}
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
      <MoviesCard
        buttonDelete={props.buttonDelete}
      />
    </section>
  )
}

export default MoviesCardList;
