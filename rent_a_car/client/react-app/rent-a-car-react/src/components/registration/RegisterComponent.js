import React, { Component } from "react";
import userService from "../../service/user.service";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./register.css";

const history = createBrowserHistory();

class RegisterComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        roles: "",
        password2: "",
        imageUrl: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.register = this.register.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value,
      },
    });
  }

  register() {
    const { user } = this.state;
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.password2 &&
      user.email &&
      user.imageUrl
    ) {
      userService.register(user);
      history.push("/login");
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="registrationPage">
        <h2 class="title">Registration in Rent a car online service</h2>
        <form id="registerForm" name="form">
          <div>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              value={user.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="First name"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="lastName"
              placeholder="Last name"
              value={user.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              placeholder="Image url"
              name="imageUrl"
              value={user.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Username"
              type="text"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Password"
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              placeholder="Confirm password"
              type="password"
              name="password2"
              value={user.password2}
              onChange={this.handleChange}
            />
            {(!user.password2 ||
              !user.password ||
              user.password != user.password2) && (
              <div className="help-block">Passwords don't match</div>
            )}
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.register}>
              Register
            </button>

            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default RegisterComponent;
