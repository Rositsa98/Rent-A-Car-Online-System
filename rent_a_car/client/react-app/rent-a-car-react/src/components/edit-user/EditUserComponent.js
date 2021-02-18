import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../service/user.service";
import { createBrowserHistory } from "history";
import "./editUser.css";

const history = createBrowserHistory();

class EditUserComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.editUser = this.editUser.bind(this);
  }

  componentDidMount() {
    let pathname = history.location.pathname;
    let id = pathname.split("/")[2];

    userService
      .retrieveUserInformation(id)
      .then((res) => res.json())
      .then((json) => this.setState({ user: json.user }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
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
    user.password = user.password2;
    return (
      <div className="editUserPage">
        <h2 className="title">Edit user in Rent a car online service</h2>
        <form name="form" id="userForm">
          <div>
            <input
              className="input"
              type="text"
              name="email"
              value={user.email}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
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
              value={user.lastName}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="imageUrl"
              placeholder="Image url"
              value={user.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="username"
              value={user.username}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              name="password"
              value={user.password}
              onChange={this.handleChange}
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="input"
              type="password"
              name="password2"
              value={user.password2}
              placeholder="Confirm password"
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
