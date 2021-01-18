import React, { Component } from "react";
import Car from "../car/Car";
import "../style/style.css";
import userService from "../../service/user.service";

class MyCarsComponent extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    this.retrieveCars();
  }

  retrieveCars() {
    userService
      .getCarsForUser(localStorage.getItem("username"))
      .then((res) => res.json())
      .then((json) => this.setState({ cars: json.cars }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  render() {
    return (
      <div className="MyCarsComponent">
        <br />
        <br />
        <h3 className="title"> My rented cars: </h3>

        <div className="col-lg-11">
          <div className="row">
            {this.state.cars.map((car) => {
              return <Car key={car._id} car={car} hasAdminAccess="true" />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyCarsComponent;
