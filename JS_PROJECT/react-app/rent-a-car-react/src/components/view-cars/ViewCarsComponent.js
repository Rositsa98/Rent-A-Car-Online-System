import React, { Component } from "react";
import Car from "../car/Car";
import carService from "../../service/car.service";
import config from "../../config/config";
import { Button } from "react-bootstrap";

const APIURL = config.apiUrl;

class ViewCarsComponent extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    this.retrieveCars();
  }

  //should go in service
  retrieveCars() {
    fetch(APIURL + "/getCars", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((json) => this.setState({ cars: json.cars }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  handleDeleteCar = (id) => {
    console.log(id);
    console.log(`viewCars: handleDeleteCar: about to delete car with id=${id}`);
    carService.deleteCar(id);

    window.location.reload();
  };

  render() {
    const { cars } = this.state.cars;
    return (
      <div className="App">
        <div>Welcome to Rent a car online system! </div>

        <br />
        <br />
        <h3> Cars available for rent: </h3>

        <div>
          {this.state.cars.map((car) => {
            return <Car key={car._id} car={car} />;
          })}
        </div>
        <div className="udpateDeleteSection">
          {this.state.cars.map((car, index) => (
            <li key={car._id}>
              {car.brand + " " + car.model + " (" + car.year + ")"}
              {
                <Button onClick={() => this.handleDeleteCar(car._id)}>
                  Delete
                </Button>
              }
              <Button href={"/edit-car/" + car._id}>Update car</Button>
            </li>
          ))}
        </div>
      </div>
    );
  }
}

export default ViewCarsComponent;
