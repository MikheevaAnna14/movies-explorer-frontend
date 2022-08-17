import React from "react";

import SearchForm from './../SearchForm/SearchForm';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import LoadMore from "../LoadMore/LoadMore";
import Footer from "../Footer/Footer";

function Movies () {
  return(
    <>
    <Header
      loggedIn={true}
    />
    <SearchForm />
    <FilterCheckbox />
    <MoviesCardList />
    <LoadMore />
    <Footer />
    </>
  )
}

export default Movies;
