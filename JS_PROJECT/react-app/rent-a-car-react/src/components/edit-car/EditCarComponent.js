import React, { Component } from "react";
import carService from "../../service/car.service";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";

class EditCarComponent extends Component {
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
    this.editCar = this.editCar.bind(this);
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

  editCar() {
    const { car } = this.state;
    const id = window.location.pathname.split("/")[2];
    if (
      car.model &&
      car.brand &&
      car.year &&
      car.doors &&
      car.price &&
      car.seats &&
      car.isAvailable
    ) {
      carService
        .updateCar(car, id)
        .then((resp) => console.log(resp))
        .then(() => {
          return <Redirect to={"http://localhost:3000" + "/viewCars"} />;
        });
    }
  }

  render() {
    const { car } = this.state;
    return (
      <div className="editCarPage">
        <h2>Edit car in Rent a car online service</h2>
        <form name="form">
          <div>
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              name="brand"
              value={car.brand}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="model">Model</label>
            <input
              type="text"
              name="model"
              value={car.model}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="year">Year</label>
            <input
              type="text"
              name="year"
              value={car.year}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="seats">Seats</label>
            <input
              type="text"
              name="seats"
              value={car.seats}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="doors">Doors</label>
            <input
              type="text"
              name="doors"
              value={car.doors}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="isAvailable">Is available</label>
            <input
              type="text"
              name="isAvailable"
              value={car.isAvailable}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="price">Price</label>
            <input
              type="text"
              name="price"
              value={car.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              name="location"
              value={car.location}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <label htmlFor="rentedBy">Rented by</label>
            <input
              type="text"
              name="rentedBy"
              value={car.rentedBy}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.editCar}>
              Edit car
            </button>

            <Link to="/login" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default EditCarComponent;
