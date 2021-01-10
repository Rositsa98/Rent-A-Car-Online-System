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
            {
              /* console.log(car); */
            }
            return <Car key={car._id} car={car} />;
          })}
        </div>
      </div>
    );
  }
}

export default ViewCarsComponent;
