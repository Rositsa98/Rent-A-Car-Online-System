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

class AppNavbar extends Component {
  render() {
    const { user } = this.props;
    return (
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
              <Nav.Link
                // disabled={!config.isUserAuthorized("/check")}
                href="/view-cars"
              >
                Cars
              </Nav.Link>
              <Nav.Link
                // disabled={!config.isUserAuthorized("/view-users")}
                href="/view-users"
              >
                Users
              </Nav.Link>
              <Nav.Link
                // disabled={!config.isUserAuthorized("/add-car")}
                href="/addCar"
              >
                Add car
              </Nav.Link>
              <Nav.Link
                // disabled={!config.isUserAuthorized("/viewchain")}
                href="/statistics"
              >
                Statistics
              </Nav.Link>
            </Nav>
            <Form inline>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
              />
              <Button
                className="searchBtn"
                variant="outline-success"
                // onClick={this.generateSearchResults}
              >
                Search
              </Button>
            </Form>
            <NavDropdown title="usernameTest" id="basic-nav-dropdown">
              <NavDropdown.Item href={"/edit-user/" + "testId"}>
                Edit profile
              </NavDropdown.Item>
              <NavDropdown.Item href={"/my-cars/" + "testId"}>
                My cars
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default AppNavbar;
