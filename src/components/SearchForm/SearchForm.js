import React from "react";

import './SearchForm.css';

function SearchForm () {
  return(
    <div className="search">
      <form className="search-form">
        <input type="text" name="search-films" className="search-form__input" placeholder="Фильм" required/>
        <button type="submit" name="search-button" className="search-form__button" />
      </form>
      <hr className="search-form__line" />
    </div>
  )
}

export default SearchForm;
