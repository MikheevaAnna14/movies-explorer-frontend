import React, { useState } from "react";

import './Profile.css';
import Header from "../Header/Header";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Profile (props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  console.log('profile', currentUser);

  React.useEffect(() => {
    console.log('currentUser.name', currentUser.name);
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
  }, [currentUser])
  
  function handleChangeName(event) {
    const input = event.target;
    setUserName(input.value);
    setIsValidName(input.validity.valid);
    if(!isValidName) {
      setErrorName(input.validationMessage)
    } else {
      setErrorName('')
    }
  }

  function handleChangeEmail(event) {
    const input = event.target;
    setUserEmail(input.value);
    setIsValidEmail(input.validity.valid);
    if(!isValidEmail) {
      setErrorEmail(input.validationMessage)
    } else {
      setErrorEmail('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onSubmit(userName, userEmail);
  }

  return(
    <div className="profile">
      <Header 
        isLoggedIn={props.isLoggedIn}
      />
      <form className="profile-form" name="form-profile" onSubmit={handleSubmit}>
        <h1 className="profile-form__title">Привет, {userName}!</h1>
        <div className="profile-form__container">
          <label htmlFor="profile-name" className="profile-form__label">Имя</label>
          <input
            type="text"
            className="profile-form__input"
            id="profile-name"
            value={userName}
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
            value={userEmail}
            onChange={handleChangeEmail}
            placeholder="Введите Email"
          />
        </div>
        <span className="profile-form__input-error">{errorEmail}</span>
        <span className="profile-form__input-error profile-form__input-error_server-request">
          Вместо этого поля будет попап</span>
          <button
            type="submit"
            className="profile-form__button"
            disabled={!(isValidName && isValidEmail)}
          >
            Редактировать
          </button>
      </form>
        <button type="button" className="profile-form__button profile__button-exit" onClick={props.onClick}>
          Выйти из аккаунта
        </button>
    </div>
  )
}

export default Profile;
