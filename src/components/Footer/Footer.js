import React from "react";
import './Footer.css';

function Footer () {
  return(
    <div className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <hr className="footer__line" />
      <div className="footer__container">
      <p className="footer__text footer__text_copyright">&copy; 2022</p>
      <ul className="footer__list">
        <li className="footer__text footer__text_list-element">Яндекс.Практикум</li>
        <li className="footer__text footer__text_list-element">Github</li>
        <li className="footer__text footer__text_list-element">Facebook</li>
      </ul>
      </div>
    </div>
  )
}

export default Footer;
