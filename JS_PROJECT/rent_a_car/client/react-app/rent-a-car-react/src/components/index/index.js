import React, { Component } from "react";
import Car from "../car/Car";
import config from "../../config/config";
import carService from "../../service/car.service";

class Index extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    this.retrieveCars();
  }

  retrieveCars() {
    carService
      .retrieveCars()
      .then((res) => res.json())
      .then((json) => this.setState({ cars: json.cars }))
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  render() {
    return (
      <div className="ViewCars">
        <br />
        <h2 className="title">Welcome to Rent a car online system! </h2>
        <br />
        <br />
        <h3 className="title"> Cars available for rent: </h3>

        <div className="col-lg-11">
          <div className="row">
            {this.state.cars.map((car) => {
              return <Car key={car._id} car={car} hasAdminAccess="false" />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;
