import React, { Component } from "react";
import Car from "../car/Car";

import config from "../../config/config";

const APIURL = config.apiUrl;

class Index extends Component {
  state = {
    cars: [],
  };

  componentDidMount() {
    this.retrieveCars();
  }

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
      <div className="ViewCars">
        <br />
        <h2 className="title">Welcome to Rent a car online system! </h2>
        <br />
        <br />
        <h3 className="title"> Cars available for rent: </h3>

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

export default Index;
