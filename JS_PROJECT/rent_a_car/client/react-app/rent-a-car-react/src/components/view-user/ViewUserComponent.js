import React, { Component } from "react";
import userService from "../../service/user.service";
import { Button } from "react-bootstrap";
import { createBrowserHistory } from "history";
import "./ViewUser.css";

const history = createBrowserHistory();

class ViewUserComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      carsCount: -1,
    };

    this.rentedCarsCount = this.rentedCarsCount.bind(this);
  }

  componentDidMount() {
    let pathname = history.location.pathname;
    let id = pathname.split("/")[2];

    userService
      .retrieveUserInformation(id)
      .then((res) => res.json())
      .then((json) => this.setState({ user: json.user }))
      .then(() => this.rentedCarsCount(this.state.user.username))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  componentDidUpdate() {
    this.retrieveUserInformation();
  }

  retrieveUserInformation() {
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
  handleDeleteUser(id) {
    console.log(id);
    console.log(
      `viewUser: handleDeleteUser: about to delete car with id=${id}`
    );
    userService
      .deleteUser(id)
      .then(() => history.push("/view-users"))
      .then(() => window.location.reload());
  }

  rentedCarsCount(username) {
    console.log(username);
    userService
      .getCarsForUser(username)
      .then((resp) => resp.json())
      .then((resp) => this.setState({ carsCount: resp.cars.length }))

      .catch((err) => {
        console.log("err is " + err.message);
      });
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
          <div>Rented cars count: {this.state.carsCount}</div>
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
