import React, { Component } from "react";
import Car from "../car/Car";
import { Dropdown, Button } from "react-bootstrap";
import "../style/style.css";
import carService from "../../service/car.service";

class ViewCarsComponent extends Component {
  constructor() {
    super();
    this.state = {
      cars: [],
      brands: [],
      models: [],
      locations: [],
      filteredCars: [],

      selectedBrand: "",
      selectedModel: "",
      selectedLocation: "",
    };

    this.retrieveCars = this.retrieveCars.bind(this);
  }

  componentDidMount() {
    this.retrieveCars();
  }

  componentDidUpdate() {}

  retrieveCars() {
    carService
      .retrieveCars()
      .then((res) => res.json())
      .then((json) => this.setState({ cars: json.cars }))
      .then(() => this.setState({ filteredCars: this.state.cars }))
      .then(() =>
        this.state.cars.forEach((car) => {
          let joinedBrands = this.state.brands.concat(car.brand);
          this.setState({ brands: joinedBrands });
        })
      )
      .then(() =>
        this.state.cars.forEach((car) => {
          let joinedModels = this.state.models.concat(car.model);
          this.setState({ models: joinedModels });
        })
      )
      .then(() =>
        this.state.cars.forEach((car) => {
          let joinedLocations = this.state.locations.concat(car.location);
          this.setState({ locations: joinedLocations });
        })
      )
      .catch((err) => {
        console.log("err is " + err.message);
      });
  }

  filterCars() {
    let filter = [];

    let indexes = [];
    for (let j = 0; j < this.state.cars.length; j++) {
      indexes.push(j);
    }

    console.log(indexes);

    let filter2 = [];
    filter2 = indexes
      .filter(
        (index) =>
          this.state.selectedBrand == "" ||
          this.state.cars[index].brand == this.state.selectedBrand
      )
      .filter(
        (index) =>
          this.state.selectedModel == "" ||
          this.state.cars[index].model == this.state.selectedModel
      )
      .filter(
        (index) =>
          this.state.selectedLocation == "" ||
          this.state.cars[index].location == this.state.selectedLocation
      );

    console.log(filter2);

    for (let idx in filter2) {
      filter.push(this.state.cars[filter2[idx]]);
    }

    this.setState({ filteredCars: filter });
    console.log(filter);
  }

  render() {
    return (
      <div className="ViewCars">
        <br />
        <br />
        <h3 className="title"> Cars available for rent: </h3>

        <div id="filter-dropdowns">
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Brand
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.state.brands.map((brand) => {
                return (
                  <Dropdown.Item
                    onClick={(event) => {
                      console.log(event.target.text);
                      this.setState({ selectedBrand: event.target.text });
                    }}
                  >
                    {brand}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
            {this.state.selectedBrand}
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Model
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.state.models.map((model) => {
                return (
                  <Dropdown.Item
                    onClick={(event) => {
                      console.log(event.target.text);
                      this.setState({ selectedModel: event.target.text });
                      let filteredCars = this.state.cars.filter(
                        (car) => car.model === event.target.text
                      );
                    }}
                  >
                    {model}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>
            {this.state.selectedModel}
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Location
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {this.state.locations.map((location) => {
                return (
                  <Dropdown.Item
                    onClick={(event) => {
                      console.log(event.target.text);
                      this.setState({ selectedLocation: event.target.text });
                    }}
                  >
                    {location}
                  </Dropdown.Item>
                );
              })}
            </Dropdown.Menu>

            {this.state.selectedLocation}
          </Dropdown>

          <Button
            className="searchBtn"
            variant="outline-success"
            onClick={this.filterCars.bind(this)}
          >
            Search
          </Button>
        </div>
        <div className="col-lg-11">
          <div className="row">
            {this.state.filteredCars.map((car) => {
              return <Car key={car._id} car={car} hasAdminAccess="true" />;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default ViewCarsComponent;
