import React, { Component } from "react";

import { Button } from "react-bootstrap";
import { createBrowserHistory } from "history";
import userService from "../../service/user.service";
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
        <Button href={"/view-user/" + user._id}>Show user details</Button>
        <div className="userImg">{user._id}</div>
        <div>First name: {user.firstName}</div>
        <div>Last name: {user.lastName}</div>
        <div>Username: {user.username}</div>
        <div>Roles: {user.roles}</div>
        <div>Email: {user.email}</div>
        <li key={user._id}>
          {user.username + " " + user.firstName}
          {
            <Button onClick={() => this.handleDeleteUser(user._id)}>
              Delete
            </Button>
          }
          <Button href={"/edit-user/" + user._id}>Update user</Button>
        </li>
        ;
      </div>
    );
  }
}

export default User;
