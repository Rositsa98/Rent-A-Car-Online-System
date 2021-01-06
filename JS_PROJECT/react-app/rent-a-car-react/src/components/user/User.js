import React, { Component } from "react";

class User extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  showUserDetails() {}

  render() {
    return (
      <div className="User">
        <a href="/">Show user details</a>

        <div className="userImg">{this.props.user.id}</div>
        <div>First name: {this.props.user.firstName}</div>
        <div>Last name: {this.props.user.lastName}</div>
        <div>Username: {this.props.user.username}</div>
        <div>Roles: {this.props.user.roles}</div>
        <div>Email: {this.props.user.email}</div>
      </div>
    );
  }
}

export default User;
