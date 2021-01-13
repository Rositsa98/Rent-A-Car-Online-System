import React, { Component } from "react";
import "./Car.css";
import { Button } from "react-bootstrap";
import carService from "../../service/car.service";
import socketIOClient from "socket.io-client";

const socket = socketIOClient("http://localhost:3001");

class Car extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.rentCar = this.rentCar.bind(this);
  }

  handleDeleteCar = (id) => {
    console.log(id);
    console.log(`viewCars: handleDeleteCar: about to delete car with id=${id}`);
    carService.deleteCar(id);

    window.location.reload();
  };

  rentCar = (event) => {
    event.preventDefault();
    const carId = this.props.car._id;
    socket.emit("rent_a_car", { car: carId, user: "user123" });
  };

  releaseCar = (event) => {
    event.preventDefault();
    const carId = this.props.car._id;
    carService.releaseCar(carId);
    window.location.reload();
  };

  render() {
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
                {
                  <button
                    className="button"
                    onClick={() => this.handleDeleteCar(this.props.car._id)}
                  >
                    Delete
                  </button>
                }
                <Button
                  href={"/edit-car/" + this.props.car._id}
                  className="button"
                >
                  Update
                </Button>

                <button className="button" onClick={this.rentCar}>
                  {" "}
                  Rent
                </button>
                {/* TODO pass username too */}

                <button className="button" onClick={this.releaseCar}>
                  {" "}
                  Release
                </button>

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
