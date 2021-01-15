import React, { Component } from "react";
import Car from "../car/Car";
import carService from "../../service/car.service";
import config from "../../config/config";
import { Button } from "react-bootstrap";
import "../style/style.css";
import userService from "../../service/user.service";

const APIURL = config.apiUrl;

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
    const { cars } = this.state.cars;
    return (
      <div className="MyCarsComponent">
        <br />
        <br />
        <h3 className="title"> My rented cars: </h3>

        <div className="col-lg-11">
          <div className="row">
            {this.state.cars.map((car) => {
              return <Car key={car._id} car={car} />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default MyCarsComponent;
