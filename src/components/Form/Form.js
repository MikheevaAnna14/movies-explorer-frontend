import React, { useState } from "react";
import { Link } from "react-router-dom";

import './Form.css';
import headerLogo from '../../images/logo.svg';


function Form (props) {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');

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

  function handleChangePassword(event) {
    const input = event.target;
    setIsValidPassword(input.validity.valid);
    if(!isValidPassword) {
      setErrorPassword(input.validationMessage)
    } else {
      setErrorPassword('')
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return(
    <div className="form" name={props.name}>
      <Link to="/">
        <img src={headerLogo} className="form__logo" alt="иконка логотип" />
      </Link>
      <h2 className="form__title">{props.title}</h2>
      <form className="form-container" name={`form-${props.name}`} onSubmit={handleSubmit}>
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
          onChange={handleChangePassword}
          required
        />
        <span className={`form-container__input-error form-container__${props.name}-input-error`}>{errorPassword}</span>
        <Link to={props.path}>
          <button 
            type="submit"
            className={`form-container__button form-container__${props.name}-button`}
            disabled={!(isValidEmail && isValidPassword && props.validity)}
          >
            {props.button}
          </button>
        </Link>
        <p className="form-container__text">{props.text}<Link to={props.link} className="form-container__text form-container__link">
          {props.textLink}</Link></p>
      </form>
    </div>
  )
}

export default Form;
