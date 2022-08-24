import React from "react";

import './SavedMovies.css';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
// import MoviesCard from "../MoviesCard/MoviesCard";
import LoadMore from "../LoadMore/LoadMore";

function SavedMovies (props) {
  return(
    <div className="saved-movies">
      <Header
        isLoggedIn={props.isLoggedIn}
      />
      <SearchForm />
      <FilterCheckbox />
      {/* карточки будут загружаться из БД и стейт-переменной */}
      <MoviesCardList
        buttonDelete={true}
      />
      <LoadMore />
    </div>
  )
}

export default SavedMovies;
