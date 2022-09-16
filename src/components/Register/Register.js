import React, { useState } from "react";
import Form from "../Form/Form";

function Register(props) {
  const [name, setName] = useState('');
  const [isChangeName, setIsChangeName] = useState(false);
  const [isValidName, setIsValidName] = useState(true);
  const [errorName, setErrorName] = useState('');
  const inputNameValid = isValidName && isChangeName;

  React.useEffect(() => {
    if(!isValidName) {  
      setErrorName('Имя может содержать буквы, цифры, пробел, дефис и состоять из 2-30 символов')
    } else {
      setErrorName('')
    }
  }, [isValidName]);

  function handleChangeName(event) {
    const input = event.target;
    setName(input.value);
    setIsChangeName(true);
    setIsValidName(input.value.match(/^[a-zа-яё\-\s]{2,30}$/gi));   
  }

  return(
    <Form
      title="Добро пожаловать!"
      button="Зарегистрироваться"
      text="Уже зарегистрированы?"
      textLink="Войти"
      path="/signin"
      link="/signin"
      onSubmit={props.onSubmit}
      validity={inputNameValid}
      name={name}
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
