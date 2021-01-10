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

  render() {
    return (
      <div className="Car">
        <Button href={"/view-car/" + this.props.car._id}>
          Show car details
        </Button>
        <div className="carImg">{this.props.car._id}</div>
        <div>
          {this.props.car.brand}, {this.props.car.model}, {this.props.car.year}
        </div>
        <div className="updateDeleteSection">
          {
            <Button onClick={() => this.handleDeleteCar(this.props.car._id)}>
              Delete
            </Button>
          }
          <Button href={"/edit-car/" + this.props.car._id}>Update car</Button>

          <button onClick={this.rentCar}> Rent</button>
          {/* TODO pass username too */}
        </div>
      </div>
    );
  }
}

export default Car;
