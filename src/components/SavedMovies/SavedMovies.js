import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies (props) {
  const arrayMovies = !props.searchSavedMoviesComplete ? props.arraySavedMovies : props.selectSavedMovies;
  const moviesSaved = (!props.isCheckedSavedMovies ? arrayMovies : props.shortSavedMovies);

  return(
    <div className="saved-movies">
      <Header
        isLoggedIn={props.isLoggedIn}
        onClick={props.onClick}
      />
      <SearchForm 
        onSubmitSavedMovies={props.onSubmitSavedMovies}
      />
      <FilterCheckbox 
        onClickCheckboxSavedMovies={props.onClickCheckboxSavedMovies}
      />
      <MoviesCardList
        buttonDelete={true}
        arraySavedMovies={props.arraySavedMovies}
        moviesSaved={moviesSaved}
        onClickMoviesCardDelete={props.onClickMoviesCardDelete}
      />
      <Footer />
    </div>
  )
}

export default SavedMovies;
