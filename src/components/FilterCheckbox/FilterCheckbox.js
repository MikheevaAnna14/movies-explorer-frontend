import React, { useState } from "react";
import './FilterCheckbox.css';

function FilterCheckbox (props) {
  const [isCheck, setIsChecked] = useState(false);
  
  React.useEffect(() => {
    if(JSON.parse(localStorage.getItem('checkboxChecked')) === null) {   
      return
    } else {
      // setIsChecked(localStorage.getItem('checkboxChecked') === 'true');
      setIsChecked(JSON.parse(localStorage.getItem('checkboxChecked')));
    } 
    // console.log('FCBox isCheck', isCheck);
  },[isCheck]);

  function handleCheckboxChange(event) {
    const checkboxChecked = event.target.checked;
    // console.log('FC handleCBChange1 ChBCheked', checkboxChecked);
    localStorage.setItem('checkboxChecked', JSON.stringify(checkboxChecked));
    // console.log('FC handleCBChange2 LS ChBCheked', JSON.parse(localStorage.getItem('checkboxChecked')));
    setIsChecked(checkboxChecked);
  }

  function handleClickCheckbox(event) {
    props.onClickCheckbox(event.target.checked);
  }
  
  // console.log('FC3 isCheck', isCheck);

  return(
    <div className="filterCheckbox"> 
      {/* <input type="checkbox" className="checkbox" id="checkbox" onChange={handleCheckboxChange} checked={isCheck} onClick={props.onClick}/> */}
      <input type="checkbox" className="checkbox" id="checkbox" onChange={handleCheckboxChange} checked={isCheck} onClick={handleClickCheckbox}/>
      <label htmlFor="checkbox" className="checkbox__label">Короткометражки</label>
    </div>
  )
}

export default FilterCheckbox;
