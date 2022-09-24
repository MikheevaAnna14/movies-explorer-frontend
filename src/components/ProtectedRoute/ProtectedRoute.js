import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  return (
    <Route>
      {
        () => JSON.parse(localStorage.getItem('token')) ? <Component {...props} /> : <Redirect exact to="/" />
      }
    </Route>
  );
};

export default ProtectedRoute;
