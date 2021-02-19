import React, { Component } from "react";
import carService from "../../service/car.service";
import { Link } from "react-router-dom";
import "./addCar.css";

import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class AddCarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {
        model: "",
        brand: "",
        year: "",
        doors: "",
        price: "",
        seats: "",
        isAvailable: "",
        rentedBy: "",
        location: "",
        imageUrl: "",
      },
    };

    this.handleChange = this.handleChange.bind(this);
    this.addCar = this.addCar.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const { car } = this.state;
    this.setState({
      car: {
        ...car,
        [name]: value,
      },
    });
  }

  addCar() {
    const { car } = this.state;
    if (
      car.model &&
      car.brand &&
      car.year &&
      car.doors &&
      car.price &&
      car.seats &&
      car.isAvailable &&
      car.imageUrl
    ) {
      carService.addCar(car);
      history.push("/view-cars");
    }
  }

  render() {
    const { car } = this.state;
    return (
      <div className="page-wrapper bg p-t-180 p-b-100 font-robo">
        <div className="wrapper wrapper--w960">
          <div>
            <div id="form-div">
              <h2 className="title">Add Car</h2>
              <form id="carsForm">
                <div id="input-field-div">
                  <input
                    className="input"
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={car.brand}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={car.model}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={car.year}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    name="seats"
                    placeholder="Seats"
                    value={car.seats}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    name="doors"
                    placeholder="Doors"
                    value={car.doors}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Is available"
                    name="isAvailable"
                    value={car.isAvailable}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={car.price}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    className="input"
                    placeholder="Location"
                    name="location"
                    value={car.location}
                    onChange={this.handleChange}
                  />
                </div>
                <div>
                  <input
                    className="input"
                    type="text"
                    placeholder="Image url"
                    name="imageUrl"
                    value={car.imageUrl}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <div className="p-t-30">
                    <button
                      className="btn btn--radius btn--green"
                      type="submit"
                      onClick={this.addCar}
                    >
                      Add car
                    </button>

                    <Link to="/login" className="btn btn-primary">
                      Cancel
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default AddCarComponent;
