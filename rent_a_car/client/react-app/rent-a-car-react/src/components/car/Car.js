import React, { Component } from "react";
import "./Car.css";
import { Button } from "react-bootstrap";
import carService from "../../service/car.service";
import socketIOClient from "socket.io-client";

const config = require("../../config/config");
const URL = config.get("url");

const socket = socketIOClient(URL);

class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.rentCar = this.rentCar.bind(this);
  }

  handleDeleteCar = (event) => {
    event.preventDefault();
    const carId = this.props.car._id;
    console.log(carId);
    console.log(
      `viewCars: handleDeleteCar: about to delete car with id=${carId}`
    );
    carService.deleteCar(carId);

    window.location.reload();
  };

  rentCar = (event) => {
    event.preventDefault();
    const carId = this.props.car._id;
    socket.emit("rent_a_car", {
      car: carId,
      user: localStorage.getItem("username"),
    });
    //TODO - add notification message
  };

  releaseCar = (event) => {
    event.preventDefault();
    const carId = this.props.car._id;
    carService.releaseCar(carId);
    window.location.reload();
  };

  render() {
    const hasAdminAccess = this.props.hasAdminAccess;
    return (
      <div className="Car">
        {
          <div className="card h-100">
            <div className="card-body">
              <div className="img">
                <img className="carImg" src={this.props.car.imageUrl}></img>
              </div>
              <div className="carInfo">
                {this.props.car.brand}, {this.props.car.model},{" "}
                {this.props.car.year}
              </div>
              <div className="updateDeleteSection">
                {localStorage.getItem("roles") === "admin" &&
                hasAdminAccess === "true" ? (
                  <button className="button" onClick={this.handleDeleteCar}>
                    Delete
                  </button>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "admin" &&
                hasAdminAccess === "true" ? (
                  <Button
                    href={"/edit-car/" + this.props.car._id}
                    className="button"
                  >
                    Update
                  </Button>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "admin" ||
                hasAdminAccess === "true" ? (
                  <button className="button" onClick={this.rentCar}>
                    {" "}
                    Rent
                  </button>
                ) : (
                  ""
                )}
                {localStorage.getItem("roles") === "admin" ||
                hasAdminAccess === "true" ? (
                  <button className="button" onClick={this.releaseCar}>
                    {" "}
                    Release
                  </button>
                ) : (
                  ""
                )}
                <Button
                  href={"/view-car/" + this.props.car._id}
                  className="button"
                >
                  Details
                </Button>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default Car;
