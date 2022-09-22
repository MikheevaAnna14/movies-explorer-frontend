import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function SavedMovies (props) {
  const selectMovies = props.selectSavedMovies;
  const arrayMovies = !props.searchSavedMoviesComplete ? props.arraySavedMovies : props.selectSavedMovies;
  const moviesSaved = (selectMovies !== undefined && selectMovies.length !== 0 ) ? 
    (!props.isCheckedSavedMovies ? props.selectSavedMovies : props.shortSavedMovies) :
    (!props.isCheckedSavedMovies ? arrayMovies : props.shortSavedMovies);

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
