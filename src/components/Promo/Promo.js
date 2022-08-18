import React from "react";

import './Promo.css';
import promoImage from '../../images/promo-image.svg';

function Promo() {
  return(
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <div className="promo__image">
        <img src={promoImage} alt="изображение на баннере" />
      </div>
    </section>
  )
}

export default Promo;
