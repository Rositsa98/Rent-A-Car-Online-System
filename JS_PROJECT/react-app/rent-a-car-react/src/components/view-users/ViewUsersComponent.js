import React, { Component } from "react";
import User from "../user/User";
import { Button } from "react-bootstrap";
import config from "../../config/config";
import userService from "../../service/user.service";

const APIURL = config.apiUrl;

class ViewUsersComponent extends Component {
  state = {
    users: [],
  };

  componentDidMount() {
    this.retrieveUsers();
  }

  retrieveUsers() {
    fetch(APIURL + "/getUsers", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ users: json.users }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  handleDeleteUser(id) {
    console.log(id);
    console.log(
      `viewUsers: handleDeleteUser: about to delete user with id=${id}`
    );
    userService.deleteUser(id);

    window.location.reload();
  }

  render() {
    return (
      <div className="App">
        <div>Users in Rent a car online system: </div>

        <br />
        <br />
        <h3> Users: </h3>

        <div>
          {this.state.users.map((user) => {
            {
              /* console.log(car); */
            }
            return <User key={user._id} user={user} />;
          })}
        </div>
        <div className="udpateDeleteSection">
          {this.state.users.map((user, index) => (
            <li key={user._id}>
              {user.username + " " + user.firstName}
              {
                <Button onClick={() => this.handleDeleteUser(user._id)}>
                  Delete
                </Button>
              }
              <Button href={"/edit-user/" + user._id}>Update user</Button>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default ViewUsersComponent;
