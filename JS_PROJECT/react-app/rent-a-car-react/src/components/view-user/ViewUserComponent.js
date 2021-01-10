import React, { Component } from "react";
import User from "../user/User";
import userService from "../../service/user.service";
import config from "../../config/config";
import { Button } from "react-bootstrap";
import { createBrowserHistory } from "history";
import "./ViewUser.css";

const history = createBrowserHistory();

const APIURL = config.apiUrl;

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }

  componentDidMount() {
    let pathname = history.location.pathname;
    let id = pathname.split("/")[2];

    fetch("http://localhost:3001/api/getUser/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ user: json.user }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  componentDidUpdate() {
    this.retrieveUserInformation();
  }

  //should go in service
  retrieveUserInformation() {
    let pathname = history.location.pathname;
    let id = pathname.split("/")[2];

    fetch("http://localhost:3001/api/getUser/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ user: json.user }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }
  handleDeleteUser(id) {
    console.log(id);
    console.log(
      `viewUser: handleDeleteUser: about to delete car with id=${id}`
    );
    userService.deleteUser(id).then(() => history.push("/view-users"));
  }

  render() {
    const { user } = this.state;
    return (
      <div className="ViewUser">
        <br />
        <h3 className="title">View more information about user: </h3>

        <br />
        <br />

        <div className="User">
          <div className="userImg">
            <img id="userImg" src={user.imageUrl} />
          </div>
          <div>First name: {user.firstName}</div>
          <div>Last name: {user.lastName}</div>
          <div>Username: {user.username}</div>
          <div>Roles: {user.roles}</div>
          <div>Email: {user.email}</div>
          <Button
            className="button-view-user"
            onClick={() => this.handleDeleteUser(user._id)}
          >
            Delete
          </Button>
          <Button className="button-view-user" href={"/edit-user/" + user._id}>
            Update user
          </Button>
        </div>
      </div>
    );
  }
}

export default ViewUserComponent;
