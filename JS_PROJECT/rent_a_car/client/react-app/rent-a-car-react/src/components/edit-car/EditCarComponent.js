import React, { Component } from "react";
import carService from "../../service/car.service";
import { Link } from "react-router-dom";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

class EditCarComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.editCar = this.editCar.bind(this);
  }

  componentDidMount() {
    this.retrieveCarInformation();
  }

  retrieveCarInformation() {
    const id = window.location.pathname.split("/")[2];

    carService
      .retrieveCarInformation(id)
      .then((res) => res.json())
      .then((json) => {
        this.setState({ car: json.car });
        console.log("STATE" + this.state.car);
      })
      .catch((err) => {
        console.log("err is " + err.message);
      });
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
      car.isAvailable &&
      car.imageUrl
    ) {
      carService.updateCar(car, id);
      history.push("/view-cars");
    }
  }

  render() {
    const { car } = this.state;
    return (
      <div className="editCarPage">
        <h2 className="title">Edit car in Rent a car online service</h2>
        <form name="form" id="carsForm">
          <div>
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
              name="isAvailable"
              placeholder="Is available"
              value={car.isAvailable}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="price"
              placeholder="Price"
              value={car.price}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="location"
              placeholder="Location"
              value={car.location}
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              className="input"
              type="text"
              name="rentedBy"
              placeholder="Rented by"
              value={car.rentedBy}
              onChange={this.handleChange}
            />
          </div>

          <div>
            <input
              className="input"
              type="text"
              name="imageUrl"
              placeholder="Image url"
              value={car.imageUrl}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <button className="btn btn-primary" onClick={this.editCar}>
              Edit car
            </button>

            <Link to="/view-cars" className="btn btn-link">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    );
  }
}
export default EditCarComponent;
