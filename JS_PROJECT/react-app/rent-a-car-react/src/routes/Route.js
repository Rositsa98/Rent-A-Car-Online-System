import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function RouteWrapper({
  component: Component,
  isPrivate,
  ...rest
}) {
  /**
   * Redirect user to SignIn page if he tries to access a private route
   * without authentication.
   */
  // if (isPrivate && !sessionStorage.getItem("user")) {
  //   return <Redirect to={{ pathname: "/login" }} />;
  // }

  /**
   * Redirect user to login page after logout
   */
  if (!isPrivate && sessionStorage.getItem("user")) {
    // if (window.location.pathname === "/logout") {
    // console.log("redirect to login");
    //return <Redirect to={{ pathname: "/login" }} />;
    //}
  }

  return <Route {...rest} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
