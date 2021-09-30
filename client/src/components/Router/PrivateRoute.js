import React from "react";
import { Redirect, Route } from "react-router-dom";
export  const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = localStorage.getItem("token");
  if (isAuth) {
    return <Route component={Component} {...rest} />;
  }
  return <Redirect to="/" />;
};

