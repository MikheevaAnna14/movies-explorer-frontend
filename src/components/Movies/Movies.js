import React, { useState } from "react";

import SearchForm from './../SearchForm/SearchForm';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import LoadMore from "../LoadMore/LoadMore";
import Footer from "../Footer/Footer";

function Movies (props) {
  const [row, setRow] = useState(4);
  const [column, setColumn] = useState(4);
  const movies = (!props.isChecked ? props.movieSelected : props.shortMovies);
  const width = window.innerWidth;
  const [windowDimensions, setWindowDimensions] = useState(width);

  React.useEffect(() => {
    if(windowDimensions < 767) {
      setColumn(1);
      setRow(5);
      return;
    }
    if(windowDimensions < 1000) {
      setColumn(2);
      setRow(4);
      return;
    } else {
      setColumn(4);
      setRow(4);
      return;
    }
  },[windowDimensions]);

  React.useEffect(() => {
    function handleResize() {
      setWindowDimensions(width);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [width]);

  function handleClickLoadMore() {
    if(windowDimensions < 1000) {
      setRow(row + 2);
    } else {
    setRow(row + 1);
    }
  }

 function handleDisableLoadMore() {
  if(row*column >= movies.length) {
    return true
  }
  return false
 }

  return(
    <>
    <Header
      isLoggedIn={props.isLoggedIn}
    />
    <SearchForm 
      onSubmit={props.onSubmit}
    />
    <FilterCheckbox 
      onClickCheckbox={props.onClickCheckbox}
    />
    <MoviesCardList
      rows={row}
      columns={column}
      movies={movies}
      moviesSelected={props.moviesSelected}
      shortMovies={props.shortMovies}
      checkboxStatus={props.isChecked}
      onClickMoviesCard={props.onClickMoviesCard}
      arraySavedMovies={props.arraySavedMovies}
    />
    <LoadMore
      onClick={handleClickLoadMore} 
      disableLoadMore={handleDisableLoadMore}
    />
    <Footer />
    </>
  )
}

export default Movies;
