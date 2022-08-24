import React from "react";

import Form from "../Form/Form";
import './Login.css';

function Login (props) {
  return(
    <Form 
      title="Рады видеть!"
      button="Войти"
      text="Ещё не зарегистрированы?"
      textLink="Регистрация"
      path="/movies"
      link="/signup"
      onSubmit={props.onSubmit}
      validity={'true'}
    />
  )
}

export default Login;
