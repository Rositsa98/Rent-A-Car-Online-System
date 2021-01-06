import React, { Component } from "react";
import "./Car.css";

class Car extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  showCarDetails() {}

  //TODO make to get correct endpoint in show car details
  render() {
    return (
      <div className="Car">
        <a href="/">Show car details</a>

        <div className="carImg">{this.props.car.id}</div>
        <div>Brand: {this.props.car.brand}</div>
        <div>Model: {this.props.car.model}</div>
        <div>Year: {this.props.car.year}</div>
      </div>
    );
  }
}

export default Car;
