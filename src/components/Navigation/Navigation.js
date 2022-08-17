import React from "react";
import { Link, NavLink } from "react-router-dom";

import './Navigation.css';

function Navigation(props) {
  return(
      <div className={props.loggedIn ? "nav nav_type-movies" : "nav"}>
        {!props.loggedIn ?
          <>
            <ul className="nav__links">
              <li>
                <Link to="/signup" className="nav__link">Регистрация</Link>
              </li>
            </ul>
            <Link to="/signin">
              <button type="button" className="nav__button">Войти</button>
            </Link>
          </>
          :
        (props.isOpen && props.loggedIn ? 
            <>
              <ul className="nav__links">
                <li>
                  <NavLink exact to="/" activeClassName="nav__container-link_active" className="nav__container-link">
                    Главная</NavLink>
                </li>
                <li>
                  <NavLink to="/movies" activeClassName="nav__container-link_active" className="nav__container-link">
                    Фильмы</NavLink>
                </li>
                <li>
                  <NavLink to="/saved-movies" activeClassName="nav__container-link_active"
                    className="nav__container-link">Сохранённые фильмы</NavLink>
                </li>
              </ul>
              <Link to="/profile" className="nav__button-link">
                <button type="button" className="nav__button-account nav__button-account_container">Аккаунт</button>
              </Link>
            </> 
          :
            <>
              <ul className="nav__links">
                <li>
                  <NavLink to="/movies" activeClassName="nav__link-movies_active" className="nav__link nav__link-movies">
                    Фильмы</NavLink>
                </li>
                <li>
                  <NavLink to="/saved-movies" activeClassName="nav__link-movies_active" className="nav__link nav__link-movies">
                    Сохранённые фильмы</NavLink>
                </li>
              </ul>
              <Link to="/profile">
                <button type="button" className="nav__button-account">Аккаунт</button>
              </Link>
            </>
        )
      }   
      </div>
  )
}

export default Navigation;
