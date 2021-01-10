import React, { Component } from "react";
import carService from "../../service/car.service";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

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
      car.isAvailable
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
          <div className="card card-2">
            <div className="card-heading"></div>
            <div className="card-body">
              <h2 className="title">Add Car</h2>

              <form name="carsForm">
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={car.brand}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={car.model}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={car.year}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="seats"
                    placeholder="Seats"
                    value={car.seats}
                    onChange={this.handleChange}
                  />
                </div>
                <div clasName="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="doors"
                    placeholder="Doors"
                    value={car.doors}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    placeholder="Is available"
                    name="isAvailable"
                    value={car.isAvailable}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    placeholder="Price"
                    name="price"
                    value={car.price}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    placeholder="Location"
                    name="location"
                    value={car.location}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="input-group">
                  <input
                    className="input--style-2"
                    type="text"
                    name="rentedBy"
                    placeholder="Rented by"
                    value={car.rentedBy}
                    onChange={this.handleChange}
                  />
                </div>
                <div className="form-group">
                  <div class="p-t-30">
                    <button
                      className="btn btn--radius btn--green"
                      type="submit"
                      onClick={this.addCar}
                    >
                      Add car
                    </button>
                  </div>

                  <Link to="/login" className="btn btn-primary">
                    Cancel
                  </Link>
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
