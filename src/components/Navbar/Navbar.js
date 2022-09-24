import React from "react";

import './Navbar.css';
import Navigation from "../Navigation/Navigation";

function Navbar (props) {
  if (props.isOpen) {
    return(
      <div className="navbar">
        <div className="navbar__overlay"></div>
        <div className="navbar__container">
          <button type="button" className="navbar__container-close" onClick={props.onClose}/> 
          <Navigation 
            isLoggedIn={props.isLoggedIn}
            isOpen={props.isOpen}
          />
        </div>  
      </div>
    )
  }
}

export default Navbar;
