import React, { Component } from "react";

import { Button } from "react-bootstrap";
import { createBrowserHistory } from "history";
import userService from "../../service/user.service";
import "./User.css";

const history = createBrowserHistory();

class User extends Component {
  constructor(props) {
    super(props);
    this.handleDeleteUser = this.handleDeleteUser.bind(this);
  }

  state = {};

  handleDeleteUser(id) {
    console.log(id);
    console.log(
      `viewUser: handleDeleteUser: about to delete car with id=${id}`
    );
    userService.deleteUser(id).then(() => history.push("/view-users"));
  }

  render() {
    const { user } = this.props;

    return (
      <div className="User">
        <div className="userImg">{user._id}</div>

        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
        <div>Username: {user.username}</div>
        <div>Roles: {user.roles}</div>
        <div>Email: {user.email}</div>

        <Button className="btn" onClick={() => this.handleDeleteUser(user._id)}>
          Delete
        </Button>

        <Button className="link" href={"/edit-user/" + user._id}>
          Update
        </Button>

        <Button className="link" href={"/view-user/" + user._id}>
          Details
        </Button>
      </div>
    );
  }
}

export default User;
