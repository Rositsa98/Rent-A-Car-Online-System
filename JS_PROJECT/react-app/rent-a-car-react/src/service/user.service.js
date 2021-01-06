const { config } = require("../config/config");

const APIURL = "http://localhost:3001/api"; //config.apiUrl;

export const userService = {
  login,
  //   logout,
  register,
  //     getAll,
  //     getById,
  //     update,
  //     delete: _delete
};

function login(email, password) {
  console.log("Logging in user ");

  let details = {
    email: email,
    password: password,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch("http://localhost:3001/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  }).then((user) => {
    localStorage.setItem("user", user);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    sessionStorage.setItem("user", JSON.stringify(user));

    return user;
  });
}

function handleResponse(response) {
  console.log("user.service: handleResponse: res.status=" + response.status);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    return data;
  });
}

function register(user) {
  let details = {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    password2: user.password2,
    email: user.email,
    roles: "normal - user", //TODO
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log(formBody);

  return fetch("http://localhost:3001/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  });
}

export default userService;
