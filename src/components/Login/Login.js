import React from "react";

import Form from "../Form/Form";
import './Login.css';

function Login () {

  function handleSubmit(event) {
    event.preventDefault();
  }
  
  return(
    <Form 
      name="login"
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      path="/movies"
      link="/signup"
      onSubmit={handleSubmit}
      validity={true}
    />
  )
}

export default Login;
