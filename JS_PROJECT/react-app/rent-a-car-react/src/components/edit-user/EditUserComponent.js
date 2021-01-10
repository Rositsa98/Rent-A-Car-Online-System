import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../service/user.service";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class EditUserComponent extends Component {
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
    this.editUser = this.editUser.bind(this);
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

  editUser() {
    const { user } = this.state;
    const id = window.location.pathname.split("/")[2];
    if (
      user.firstName &&
      user.lastName &&
      user.username &&
      user.password &&
      user.password2 &&
      user.email &&
      user.imageUrl
    ) {
      userService.updateUser(user, id);
      history.push("/view-users");
    }
  }

  render() {
    const { user } = this.state;
    return (
      <div className="editUserPage">
        <h2>Edit user in Rent a car online service</h2>
        <form name="form">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="imageUrl">Image url</label>
            <input
              type="text"
              name="imageUrl"
              value={user.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="password2">Confirm Password</label>
            <input
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
            <button className="btn btn-primary" onClick={this.editUser}>
              Update
            </button>

            <Link to="/view-users" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default EditUserComponent;
