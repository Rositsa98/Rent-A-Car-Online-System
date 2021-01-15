import React, { Component } from "react";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class LogoutComponent extends Component {
  componentDidMount() {
    localStorage.clear();
    sessionStorage.clear();
    history.push("/login");
    window.location.reload();
  }

  render() {
    return null;
  }
}

export default LogoutComponent;
