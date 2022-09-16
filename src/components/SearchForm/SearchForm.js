import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './SearchForm.css';

function SearchForm (props) {
  const [itemSearch, setItemSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [itemSearchSavedMovies, setItemSearchSavedMovies] = useState('');
  const [errorMessageSavedMovies, setErrorMessageSavedMovies] = useState('');
  const location = useLocation();

  React.useEffect(() => {
    if(localStorage.getItem('itemSearch') === null) {
      return
    } else {
      setItemSearch(localStorage.getItem('itemSearch'));
    }
  },[]);

  function handleMovieChange(event) {
    setErrorMessage('');
    setItemSearch(event.target.value);
  }

  function handleSavedMoviesChange(event) {
    setErrorMessageSavedMovies('');
    setItemSearchSavedMovies(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (itemSearch === '') {
      setErrorMessage('Нужно ввести ключевое слово');
    }
    props.onSubmit(itemSearch);
  }

  function handleSubmitSavedMovies(event) {
    event.preventDefault();
    if (itemSearchSavedMovies === '') {
      setErrorMessageSavedMovies('Нужно ввести ключевое слово');
    }
    props.onSubmitSavedMovies(itemSearchSavedMovies);
  }

  return(
    <div className="search">
      {location.pathname.includes("/movies") && 
        <>
        <form className="search-form" onSubmit={handleSubmit}>
          <div className="search-form__container">
            <input
              type="text"
              name="search-films"
              className="search-form__input"
              placeholder="Фильм"
              value={itemSearch}
              onChange={handleMovieChange}
            />
            <span className="search-form__input-error">{errorMessage}</span>
          </div>
          <button type="submit" name="search-button" className="search-form__button" />
        </form>
        <hr className="search-form__line" />
      </>
      }
      {location.pathname.includes("/saved-movies") &&
        <>
        <form className="search-form" onSubmit={handleSubmitSavedMovies}>
          <div className="search-form__container">
            <input
              type="text"
              name="search-films"
              className="search-form__input"
              placeholder="Фильм"
              value={itemSearchSavedMovies}
              onChange={handleSavedMoviesChange}
            />
            <span className="search-form__input-error">{errorMessageSavedMovies}</span>
          </div>
          <button type="submit" name="search-button" className="search-form__button"/>
        </form>
        <hr className="search-form__line" />
        </>
      }
      
    </div>
  )
}

export default SearchForm;
