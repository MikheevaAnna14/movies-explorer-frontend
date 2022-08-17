import React, { useState } from "react";

import Form from "../Form/Form";

function Register () {
  const [name, setName] = useState('');
  const [isValidName, setIsValidName] = useState(false);
  const [errorName, setErrorName] = useState('');

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

  function handleSubmit(event) {
    event.preventDefault();
  }

  return(
    <Form
      name="register"
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      path="/signin"
      link="/signin"
      onSubmit={handleSubmit}
      validity={isValidName}
    >
      <label htmlFor="register-name" className="form-container__label">Имя</label>
      <input
        type="text"
        className="form-container__input"
        id="register-name"
        onChange={handleChangeName}
        value={name}
        minLength="2"
        maxLength="30"
        required
      >
      </input>
      <span className="form-container__input-error">{errorName}</span>
    </Form>
  )
}

export default Register;
