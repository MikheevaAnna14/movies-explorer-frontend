import React from "react";

import './PopupInfo.css';
import popupClose from '../../images/popup-close.svg';
import iconOk from '../../images/icon-true.svg';
import iconNo from '../../images/icon-false.svg';

function PopupInfo(props) {
  const isOpen = props.isOpen ? "popup_opened" : "";
  return (
    <div className={`popup ${isOpen}`} id="popup-info">
        <div className="popup__overlay"></div>
          <div className="popup__container">
            <button type="button" id="popup-closebutton"  className="popup__close" onClick={props.onClose}>
              <img src={popupClose} className="popup__close-icon" alt="иконка крестик" />
            </button>
            <div className="popup__container-info">
              <img src={ props.isRegister ? iconOk : iconNo } className="popup__container-image" 
                alt="иконка информационного попапа" />
              <p className="popup__container-heading">
                { props.isRegister ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</p> 
            </div>
          </div>     
        </div>
  )
}

export default PopupInfo;
