import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox () {
  return(
    <div className="filterCheckbox"> 
      <input type="checkbox" className="checkbox" id="checkbox"  />
      <label htmlFor="checkbox" className="checkbox__label">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;