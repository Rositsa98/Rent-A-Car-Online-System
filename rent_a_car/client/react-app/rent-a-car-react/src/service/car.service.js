const config = require("../config/config");

const APIURL = config.get("apiUrl");

export const carService = {
  addCar,
  updateCar,
  deleteCar,
  releaseCar,
  retrieveCarInformation,
  retrieveCars,
};

function addCar(car) {
  console.log("Adding car ");

  let details = {
    model: car.model,
    brand: car.brand,
    year: car.year,
    doors: car.doors,
    price: car.price,
    seats: car.seats,
    isAvailable: car.isAvailable,
    rentedBy: "null",
    location: car.location,
    imageUrl: car.imageUrl,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(APIURL + "/addCar", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  }).then((car) => {
    localStorage.setItem("addedCar", car);
    return car;
  });
}

function deleteCar(id) {
  console.log("deleting car" + id);

  return fetch(APIURL + "/removeCar/" + id, {
    method: "DELETE",
  });
}

function updateCar(car, id) {
  console.log("Updating car " + car);

  let details = {
    model: car.model,
    brand: car.brand,
    year: car.year,
    doors: car.doors,
    price: car.price,
    seats: car.seats,
    isAvailable: car.isAvailable,
    rentedBy: localStorage.getItem("username"),
    location: car.location,
    imageUrl: car.imageUrl,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(APIURL + "/updateCar/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  }).then((resp) => {
    resp.json();
    return resp;
  });
}

function releaseCar(carId) {
  return fetch(APIURL + "/releaseCar/" + carId, {
    method: "GET",
  }).then((resp) => {
    resp.json();
    return resp;
  });
}

function retrieveCarInformation(id) {
  return fetch(APIURL + "/getCar/" + id, {
    method: "GET",
  });
}

function retrieveCars() {
  return fetch(APIURL + "/getCars", {
    method: "GET",
  });
}

export default carService;
