import React from "react";

import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList (props) {
  // const arraySavedMovies = props.arraySavedMovies;
  // console.log('MCL arraySavedMovies', arraySavedMovies);
  // console.log('arraySavesMovies{ id }', arraySavesMovies{ id });
  // console.log('MCL movie', movie);
  // function handleLikeClick (arraySavedMovies, movie) {
    const handleLikeClick = (arraySavedMovies, movie) => {
    if(arraySavedMovies !== undefined) {
      arraySavedMovies.filter((movies) => {
        // console.log('MCL2 movies', movies);
        // console.log('MCL2 movie', movie);
        // console.log('MCL2 movies.movieId === movie.id', movies.movieId === movie.id)
        return (movies.movieId === movie.id);  
      })
    } else return false;
    console.log('handleLikeClick', handleLikeClick());
    }

  return(
    <section className="card-list">
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
            isLiked={handleLikeClick()}
          />
        ))}
    </section>
  )
}

export default MoviesCardList;
