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

export default Index;
