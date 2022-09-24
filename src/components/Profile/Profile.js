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
  const inputValid = isValidName && isValidEmail;
  const inputChange = userName !== currentUser.name || userEmail !== currentUser.email;

  React.useEffect(() => {
    setUserName(currentUser.name);
    setUserEmail(currentUser.email);
    setIsValidName(true);
    setIsValidEmail(currentUser.email.match(/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i));
  }, [currentUser]);

  React.useEffect(() => {
    if(!isValidName) {  
      setErrorName('Имя может содержать буквы, цифры, пробел, дефис и состоять из 2-30 символов')
    } else {
      setErrorName('')
    }
  }, [isValidName]);

  React.useEffect(() => {
    if (!isValidEmail) {
    setErrorEmail("Введен некорректный адрес электронной почты")
    } else {
      setErrorEmail('')
    }
  },[isValidEmail]);
  
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
    setIsValidEmail(input.value.match(/^[\w-.]+@[\w-]+\.[a-z]{2,4}$/i));
    if(!isValidEmail) {
      setErrorEmail("Введен некорректный адрес электронной почты")
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
        <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>
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
        <button
          type="submit"
          className="profile-form__button"
          disabled={!(inputValid && inputChange && !props.isLoadingForm)}
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
