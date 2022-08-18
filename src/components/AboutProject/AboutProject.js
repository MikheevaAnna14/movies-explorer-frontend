import React from "react";
import './AboutProject.css';

function AboutProject () {
  return(
  <section className="aboutProject">
    <h2 className="aboutProject__title">О проекте</h2>
    <hr className="aboutProject__line" />
    <div className="aboutProject__description">
      <div className="aboutProject__description-column">
        <h3 className="aboutProject__description-subtitle">Дипломный проект включал 5 этапов</h3>
        <p className="aboutProject__description-text">Составление плана, работу над бэкендом, 
          вёрстку, добавление функциональности и финальные доработки.</p>
      </div>
      <div className="aboutProject__description-column">
        <h3 className="aboutProject__description-subtitle">На выполнение диплома ушло 5 недель</h3>
        <p className="aboutProject__description-text">У каждого этапа был мягкий и жёсткий дедлайн, 
          которые нужно было соблюдать, чтобы успешно защититься.</p>
      </div>
    </div>
    <div className="aboutProject__time">
      <div className="aboutProject__timeline">
        <div className="aboutProject__timeline-item">
          <p className="aboutProject__time-text">1 неделя</p>
        </div>
        <p className="aboutProject__timeline-signature">Back-end</p>
      </div>
      <div className="aboutProject__timeline aboutProject__timeline_frontend">
        <div className="aboutProject__timeline-item aboutProject__timeline-item_frontend">
          <p className="aboutProject__time-text aboutProject__time-text_theme-grey">4 недели</p>
        </div>
        <p className="aboutProject__timeline-signature">Front-end</p>
      </div>     
    </div>
  </section>
  )
}

export default AboutProject;
