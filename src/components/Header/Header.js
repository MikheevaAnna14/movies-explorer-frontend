import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import headerLogo from '../../images/logo.svg';
import Navigation from '../Navigation/Navigation';
import Navbar from '../Navbar/Navbar';
import burgerMenu from '../../images/icon-burger.svg';

function Header(props) {
  const [isOpen, setIsOpen] = useState(false)

  function handleClickBurger() {
    setIsOpen(true);
  }

  function handleClose() {
    setIsOpen(false);
  }
  

  return(
    <>
      <div className={!props.locationMain ? "header" : "header  header_theme-color"}>
        <Link to="/">
          <img src={headerLogo} alt="логотип" className="header__logo" />
        </Link>
        <Navigation
          isLoggedIn={props.isLoggedIn}  
        />     
      {(props.isLoggedIn && 
        <button type="button" className={!props.locationMain ? "header__burger-menu" : 
          "header__burger-menu header__burger-menu_color"} onClick={handleClickBurger}>
          <img src={burgerMenu} alt='иконка бургер-меню' />
        </button>
      )}
      </div>
      <Navbar 
        isOpen={isOpen}
        onClose={handleClose}
      />
    </>
  )
}

export default Header;