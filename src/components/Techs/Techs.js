import React from "react";

import './Techs.css';

function Techs () {
  return(
    <section className="techs">
      <h2 className="techs__title">Технологии</h2>
      <hr className="techs__line" />
      <h3 className="techs__subtitle">7 технологий</h3>
      <p className="techs__description">На курсе веб-разработки мы освоили 
        технологии, которые применили в дипломном проекте.</p>
      <div className="techs__skills">
        <div className="techs__skill">
          <p className="techs__skill-element">HTML</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">CSS</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">JS</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">React</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">Git</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">Express.js</p>
        </div>
        <div className="techs__skill">
          <p className="techs__skill-element">mongoDB</p>
        </div>        
      </div>
    </section>
  )
};

export default Techs;
