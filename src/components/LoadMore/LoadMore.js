import React from "react";
import './LoadMore.css';

function LoadMore (props) {
  const disable = props.disableLoadMore();
  return(
    <div className="load-more">
      <button type="button" className={!disable ? "load-more__button" : "load-more__button  load-more__button_disable"} onClick={props.onClick}>Ещё</button>
    </div>
  )
}

export default LoadMore;
