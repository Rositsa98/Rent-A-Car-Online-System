import React, { Component } from "react";
import User from "../user/User";

import config from "../../config/config";

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
      </div>
    );
  }
}

export default ViewUsersComponent;
