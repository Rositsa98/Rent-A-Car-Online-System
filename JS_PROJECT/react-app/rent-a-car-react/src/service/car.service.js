const { config } = require("../config/config");

const APIURL = "http://localhost:3001/api"; //config.apiUrl;

export const carService = {
  addCar,
  updateCar,
  deleteCar,
};

//TODO fix retrieve result
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
    rentedBy: "test",
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

  return fetch("http://localhost:3001/api/addCar", {
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

  return fetch("http://localhost:3001/api/removeCar/" + id, {
    method: "DELETE",
  });
}

//TODO not working
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
    rentedBy: "test",
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

  return fetch("http://localhost:3001/api/updateCar/" + id, {
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

export default carService;
