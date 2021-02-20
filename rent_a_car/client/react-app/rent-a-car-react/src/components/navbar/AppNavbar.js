import React, { Component } from "react";
import {
  FormControl,
  Button,
  Navbar,
  Form,
  Nav,
  NavDropdown,
} from "react-bootstrap";
import "./AppNavbar.css";
import { createBrowserHistory } from "history";
import socketIOClient from "socket.io-client";
const history = createBrowserHistory();

const config = require("../../config/config");
const URL = config.get("url");
const socket = socketIOClient(URL);

class AppNavbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notif_message: "",
    };
  }
  componentDidMount() {
    this.initWebSocketClient();
  }

  componentDidUpdate() {
    this.initWebSocketClient();
  }

  initWebSocketClient() {
    socket.on("notification", (data) => {
      console.log("notification " + data);
      this.setState({ notif_message: data.message });
      // this.state.notif_message = data.message;
      console.log(this.state.notif_message);
      // alert(this.state.notif_message);
    });
  }

  render() {
    const { user } = this.props;
    return (
      <div>
        <div className="appNavBar">
          <img className="navbar-logo-signme" src={""}></img>
          <Navbar bg="dark" expand="lg" variant="dark">
            <Navbar.Brand href="/index">Home</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse
              id="basic-navbar-nav"
              className="justify-content-between"
            >
              <Nav className="mr-auto">
                <Nav.Link href="/view-cars">Cars</Nav.Link>

                {localStorage.getItem("roles") === "admin" ? (
                  <Nav.Link href="/view-users">Users</Nav.Link>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "admin" ? (
                  <Nav.Link href="/addCar">Add car</Nav.Link>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "admin" ? (
                  <Nav.Link href="/statistics">Statistics</Nav.Link>
                ) : (
                  ""
                )}
              </Nav>

              {localStorage.getItem("username") ? (
                <NavDropdown
                  title={
                    localStorage.getItem("username") != undefined
                      ? localStorage.getItem("username")
                      : ""
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    href={"/edit-user/" + localStorage.getItem("id")}
                  >
                    Edit profile
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href={"/my-cars/" + localStorage.getItem("username")}
                  >
                    My cars
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <button
                  onClick={() => {
                    history.push("/login");
                    window.location.reload();
                  }}
                >
                  Login/Sign up
                </button>
              )}
            </Navbar.Collapse>
          </Navbar>
        </div>

        {/* <input value={this.state.notif_message} defaultValue="" /> */}
        <div id="notification">{this.state.notif_message}</div>
      </div>
    );
  }
}

export default AppNavbar;
