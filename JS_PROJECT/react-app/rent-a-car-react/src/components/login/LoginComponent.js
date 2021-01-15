import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import "./login.css";

import userService from "../../service/user.service";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class LoginComponent extends Component {
  state = {
    email: "",
    password: "",
    isSubmitted: false,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  login = (e) => {
    e.preventDefault();
    this.state.isSubmitted = true;
    const { email, password } = this.state;

    console.log(`email ${email} and  ${password} logged in`);

    if (email && password) {
      userService
        .login(email, password)
        .then(() => history.push("/index"))
        .then(() => window.location.reload());
    }
  };

  render() {
    const { email, password, isSubmitted } = this.state;

    return (
      <div className="background-image">
        <div className="loginPageContent">
          <div>
            <form className="loginForm">
              <div id="title">Login</div>

              <div
                id="errorMessage"
                // *ngIf="isInvalidLogin"
              >
                {/* Invalid email or password! */}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
              </div>
              <div className="form-group-btns">
                <button className="btn btn-primary" onClick={this.login}>
                  Login
                </button>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
