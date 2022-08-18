import React from "react";
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

function PageNotFound () {
  const history = useHistory();
  return(
    <div className="page-notfound">
      <p className="page-notfound__error">404</p>
      <p className="page-notfound__text">Страница не найдена</p>
      <p className="page-notfound__back" onClick={history.goBack}>Назад</p>
    </div>
  )
}

export default PageNotFound;
