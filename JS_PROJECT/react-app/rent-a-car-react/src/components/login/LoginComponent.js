import React, { Component } from "react";
import { render } from "react-dom";
import { Link } from "react-router-dom";

import userService from "../../service/user.service";

import loginImage from "../../assets/images/login-image.png";
import { Redirect } from "react-router-dom";
const { config } = require("../../config/config");

const APIURL = "http://localhost:3000"; //config.apiUrl;

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

  login() {
    this.state.isSubmitted = true;
    const { email, password } = this.state;

    console.log(`email ${email} and  ${password} logged in`);

    if (email && password) {
      userService.login(email, password).then(
        (user) => {
          console.log(user);
          // return <Redirect to={APIURL + "/index"} />;
        },
        (error) => {
          console.log("ERROR" + error);
          // <Redirect to={APIURL + "/login"} />;
        }
      );
    }
  }

  render() {
    const { email, password, isSubmitted } = this.state;

    return (
      <div className="login-page">
        <h2> Login </h2>
        <div>
          <img className="loginImg" src={loginImage}></img>
          <form className="loginForm">
            <div className="form-group">
              <label htmlFor="email">Email: </label>
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password: </label>
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
              <Link to="/register" className="btn btn-link">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default LoginComponent;
