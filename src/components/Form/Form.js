import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Form.css';
import headerLogo from '../../images/logo.svg';

function Form (props) {
  const [email, setEmail] = useState('');
  const [isChangeEmail, setIsChangeEmail] = useState(false);
  const [password, setPassword] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const inputEmailValid = isValidEmail && isChangeEmail;

  React.useEffect(() => {
    if (!isValidEmail) {
    setErrorEmail("Введен некорректный адрес электронной почты")
    } else {
      setErrorEmail('')
    }
  },[isValidEmail]);
  

  function handleChangeEmail(event) {  
    const input = event.target;
    setEmail(input.value);
    setIsChangeEmail(true);
    setIsValidEmail(input.value.match(/^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i));
  }

  function handleChangePassword(event) {
    const input = event.target;
    setPassword(input.value);
    setIsValidPassword(input.validity.valid);
    if(!isValidPassword) {
      setErrorPassword(input.validationMessage)
    } else {
      setErrorPassword('')
    }
  }

  function handleFormSubmit(event) {
    const name = props.name;
    event.preventDefault();
    props.onSubmit(email, password, name);
  }

  return(
    <div className="form">
      <Link to="/">
        <img src={headerLogo} className="form__logo" alt="иконка логотип" />
      </Link>
      <h2 className="form__title">{props.title}</h2>
      <form className="form-container" onSubmit={handleFormSubmit} >
        {props.children}
        <label htmlFor="form-email" className="form-container__label">E-mail</label>
        <input 
          type="email"
          className="form-container__input"
          id="form-email"
          value={email}
          onChange={handleChangeEmail}
          required
        />
        <span className="form-container__input-error">{errorEmail}</span>
        <label htmlFor="form-password" className="form-container__label">Пароль</label>
        <input
          type="password"
          className="form-container__input"
          id="form-password"
          value={password}
          onChange={handleChangePassword}
          required
        />
        <span className={`form-container__input-error form-container__${props.name}-input-error`}>{errorPassword}</span>
        <button
          type="submit" 
          className={`form-container__button form-container__${props.name}-button`}
          disabled={!(inputEmailValid && isValidPassword && props.validity)}
        >
          {props.button}
        </button>
        <p className="form-container__text">{props.text}<Link to={props.link} className="form-container__text form-container__link">
          {props.textLink}</Link></p>
      </form>
    </div>
  )
}

export default Form;
