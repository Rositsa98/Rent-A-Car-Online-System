import React, { Component } from "react";
import { Button } from "react-bootstrap";
import config from "../../config/config";
import userService from "../../service/user.service";
import "../style/style.css";
import "./ViewUsersComponent.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const APIURL = config.apiUrl;

class ViewUsersComponent extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };

    this.retrieveUsers();
    this.renderTableData = this.renderTableData.bind(this);
    this.renderTableHeader = this.renderTableHeader.bind(this);
  }

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
      `viewUser: handleDeleteUser: about to delete car with id=${id}`
    );
    userService.deleteUser(id).then(() => history.push("/view-users"));
  }

  renderTableData() {
    return this.state.users.map((user, index) => {
      const { id, firstName, lastName, username, roles, email } = user; //destructuring
      return (
        <tr key={id}>
          <td>{firstName}</td>
          <td>{lastName}</td>
          <td>{username}</td>
          <td>{roles}</td>
          <td>{email}</td>

          <td>
            <Button
              className="btn"
              onClick={() => this.handleDeleteUser(user._id)}
            >
              Delete
            </Button>
          </td>
          <td>
            <Button href={"/edit-user/" + user._id}>Update</Button>
          </td>
          <td>
            <Button href={"/view-user/" + user._id}>Details</Button>
          </td>
        </tr>
      );
    });
  }

  renderTableHeader() {
    let header = [
      "first name",
      "last name",
      "username",
      "roles",
      "email",
      "Delete",
      "Update",
      "Details",
    ];
    return header.map((key) => {
      console.log(key);
      return <th>{key}</th>;
    });
  }

  render() {
    return (
      <div className="ViewUsers">
        <br />
        <h3 className="title"> Users: </h3>

        <table id="users">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ViewUsersComponent;
