import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import './FilterCheckbox.css';

function FilterCheckbox (props) {
  const [isCheck, setIsChecked] = useState(false);
  const location = useLocation();
  
  React.useEffect(() => {
    if(JSON.parse(localStorage.getItem('checkboxChecked')) === null) {   
      return
    } else {
      setIsChecked(JSON.parse(localStorage.getItem('checkboxChecked')));
    } 
  },[isCheck]);

  function handleCheckboxChange(event) {
    const checkboxChecked = event.target.checked;
    localStorage.setItem('checkboxChecked', JSON.stringify(checkboxChecked));
    setIsChecked(checkboxChecked);
  }

  function handleClickCheckbox(event) {
    props.onClickCheckbox(event.target.checked);
  }

  function handleClickCheckboxSavedMovies(event) {
    props.onClickCheckboxSavedMovies(event.target.checked);
  }
  
  return(
    <div className="filterCheckbox"> 
      {location.pathname.includes("/movies") && 
        <>
          <input type="checkbox" className="checkbox" id="checkbox" onChange={handleCheckboxChange} checked={isCheck} onClick={handleClickCheckbox}/>
          <label htmlFor="checkbox" className="checkbox__label">Короткометражки</label>
        </>
      }
      {location.pathname.includes("/saved-movies") && 
        <>
          <input type="checkbox" className="checkbox" id="checkbox" onClick={handleClickCheckboxSavedMovies}/>
          <label htmlFor="checkbox" className="checkbox__label">Короткометражки</label>
        </>
      }
    </div>
  )
}

export default FilterCheckbox;
