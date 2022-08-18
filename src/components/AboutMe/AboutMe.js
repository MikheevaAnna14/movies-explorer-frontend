import React from "react";

import './AboutMe.css';
import avatar from '../../images/avatar.jpg';

function AboutMe () {
  return(
    <section className="aboutMe">
      <h2 className="aboutMe__title">Студент</h2>
      <hr className="aboutMe__line" />
      <div className="aboutMe__description">
        <div className="aboutMe__description-column-text">
          <h3 className="aboutMe__description-name">Анна</h3>
          <p className="aboutMe__description-profession">Начинающий фронтенд-разработчик</p>
          <p className="aboutMe__description-me">Я живу в Москве. У меня экономическое образовавние 
            и больше 10 лет я работала финанистом. Но очень хотела сменить профессию на более интересную
            и креативную. В настоящее время иду к своей мечте </p>
          <nav className="aboutMe__description-nav">
            <a href="https://www.facebook.com/lishudi" className="aboutMe__description-link" target='_blanc'>Facebook</a>
            <a href="https://github.com/MikheevaAnna14" className="aboutMe__description-link" target='_blanc'>Github</a>
          </nav>
        </div>
        <img src={avatar} alt="аватар" className="aboutMe__description-avatar" />
      </div>
    </section>
  )
}

export default AboutMe;