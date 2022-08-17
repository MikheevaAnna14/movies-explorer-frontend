import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Profile.css';
import Header from "../Header/Header";

function Profile () {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  
  function handleChangeName(event) {
    const input = event.target;
    setName(input.value);
    setIsValidName(input.validity.valid);
    if(!isValidName) {
      setErrorName(input.validationMessage)
    } else {
      setErrorName('')
    }
  }

  function handleChangeEmail(event) {
    const input = event.target;
    setEmail(input.value);
    setIsValidEmail(input.validity.valid);
    if(!isValidEmail) {
      setErrorEmail(input.validationMessage)
    } else {
      setErrorEmail('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return(
    <div className="profile">
      <Header />
      <form className="profile-form" name="form-profile" onSubmit={handleSubmit}>
        <h1 className="profile-form__title">Привет, {}!</h1>
        <div className="profile-form__container">
          <label htmlFor="profile-name" className="profile-form__label">Имя</label>
          <input
            type="text"
            className="profile-form__input"
            id="profile-name"
            value={name}
            onChange={handleChangeName}
            placeholder="Введите имя"
          />
        </div>
        <span className="profile-form__input-error">{errorName}</span>
        <hr className="profile-form__line"/>
        <div className="profile-form__container">
          <label htmlFor="profile-email" className="profile-form__label">E-mail</label>
          <input
            type="email"
            className="profile-form__input"
            id="profile-email"
            value={email}
            onChange={handleChangeEmail}
            placeholder="Введите Email"
          />
        </div>
        <span className="profile-form__input-error">{errorEmail}</span>
        <span className="profile-form__input-error profile-form__input-error_server-request">
          Вместо этого поля будет попап</span>
        <Link to="/movies">
          <button
            type="submit"
            className="profile-form__button"
            disabled={!(isValidName && isValidEmail)}
          >
            Редактировать
          </button>
        </Link>
      </form>
      <Link to="/">
        <button type="submit" className="profile-form__button profile__button-exit">Выйти из аккаунта</button>
      </Link>
    </div>
  )
}

export default Profile;
