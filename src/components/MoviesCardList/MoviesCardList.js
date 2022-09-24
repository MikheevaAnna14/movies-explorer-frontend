import React from "react";
import { useLocation } from "react-router-dom";

import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList (props) {
  const location = useLocation();
  if (location.pathname.includes("/movies")) {
    return(
      <section className="card-list">
        <span className={(props.searchComplete === false) ? "card-list__span card-list__span_inactive" : (props.movies.length > 0 ? 
          "card-list__span card-list__span_inactive" : "card-list__span")}>
          Ничего не найдено</span>
        {props.movies.slice(0, Math.min(props.columns * props.rows, props.movies.length))
          .map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}
              image={movie.image.url}
              trailer={movie.trailerLink}
              name={movie.nameRU}
              duration={movie.duration}
              onClick={props.onClickMoviesCard}
              arraySavedMovies={props.arraySavedMovies}
            />
          ))}
      </section>
    )} else if (location.pathname.includes("/saved-movies")) {
      return(
        <section className="card-list">
          <span className={(props.moviesSaved.length > 0) ? "card-list__span card-list__span_inactive" : "card-list__span"}>
            Ничего не найдено</span>
          {props.moviesSaved
            .map((movie) => (
              <MoviesCard
                movie={movie}
                key={movie._id}
                image={movie.image}
                trailer={movie.trailerLink}
                name={movie.nameRU}
                duration={movie.duration}
                onClickButtonDelete={props.onClickMoviesCardDelete}
                arraySavedMovies={props.arraySavedMovies}
                buttonDelete={props.buttonDelete}
              />
            ))}
        </section>
    )} 
}

export default MoviesCardList;
