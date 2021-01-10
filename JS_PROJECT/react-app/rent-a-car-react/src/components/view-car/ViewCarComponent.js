import React, { Component } from "react";
import Car from "../car/Car";
import carService from "../../service/car.service";
import config from "../../config/config";
import { Button } from "react-bootstrap";
import "./ViewCar.css";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class ViewCarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car: {},
    };

    this.handleDeleteCar = this.handleDeleteCar.bind(this);
  }

  componentDidMount() {
    this.retrieveCarInformation();
  }

  //should go in service
  retrieveCarInformation() {
    const id = window.location.pathname.split("/")[2];

    fetch("http://localhost:3001/api/getCar/" + id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({ car: json.car });
        console.log("STATE" + this.state.car);
      })
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  handleDeleteCar = (id) => {
    console.log(id);
    console.log(`viewCar: handleDeleteCar: about to delete car with id=${id}`);
    carService.deleteCar(id);

    history.push("/view-cars");
  };

  render() {
    const { car } = this.state;
    console.log(car);
    return (
      <div className="Car">
        <br />
        <h3 className="title">View more information about car: </h3>
        <br />
        <br />

        <img id="carImg" src={car.imageUrl} />

        <div>Brand: {car.brand}</div>
        <div>Model: {car.model}</div>
        <div>Year: {car.year}</div>
        {/* TODO we could add image here */}

        <Button
          className="button-view-car"
          onClick={() => this.handleDeleteCar(car._id)}
        >
          Delete
        </Button>

        <Button className="button-view-car" href={"/edit-car/" + car._id}>
          Update car
        </Button>
      </div>
    );
  }
}

export default ViewCarComponent;
