import React from "react";
import './Portfolio.css';
import portfolioLink from '../../images/portfolio-link.svg';

function Portfolio () {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <div className="portfolio__links">
        <p className="portfolio__link-name">Статичный сайт</p>         
          <a href="https://mikheevaanna14.github.io/how-to-learn/" className="portfolio__link" target="_blanc">
            <img src={portfolioLink} alt="иконка ссылки" className="portfolio__link-image" />
          </a>   
      </div>
      <hr className="portfolio__line"></hr>
      <div className="portfolio__links">
        <p className="portfolio__link-name">Адаптивный сайт</p>         
          <a href="https://mikheevaanna14.github.io/russian-travel" className="portfolio__link" target="_blanc">
            <img src={portfolioLink} alt="иконка ссылки" className="portfolio__link-image" />
          </a>   
      </div>
      <hr className="portfolio__line"></hr>
      <div className="portfolio__links">
        <p className="portfolio__link-name">Одностраничное приложение</p>         
          <a href="https://mesto.annam.nomoredomains.xyz " target="_blanc">
            <img src={portfolioLink} alt="иконка ссылки" className="portfolio__link-image" />
          </a>   
      </div>
    </section>
  )
}

export default Portfolio;
