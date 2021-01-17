const config = require("../config/config");

const APIURL = config.get("apiUrl");

export const userService = {
  login,
  register,
  updateUser,
  deleteUser,
  getCarsForUser,
  retrieveUserInformation,
  retrieveUsers,
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

  return fetch(APIURL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  })
    .then((resp) => resp.json())
    .then((resp) => {
      console.log(resp);
      localStorage.setItem("username", resp.username);
      localStorage.setItem("id", resp.id);
      localStorage.setItem("email", resp.email);
      localStorage.setItem("roles", resp.roles);
      return resp;
    })
    .catch((err) => {
      console.log("ERROR" + err);
      localStorage.setItem("errLogin", err);
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
    roles: "normal-user",
    imageUrl: user.imageUrl,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");
  console.log(formBody);

  return fetch(APIURL + "/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formBody,
  });
}

function updateUser(user, id) {
  console.log("Updating user " + user);

  let details = {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    password2: user.password2,
    email: user.email,
    roles: user.roles,
    imageUrl: user.imageUrl,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch(APIURL + "/updateUser/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
}

function deleteUser(id) {
  console.log("deleting user" + id);

  return fetch(APIURL + "/removeUser/" + id, {
    method: "DELETE",
  });
}

function getCarsForUser(username) {
  return fetch(APIURL + "/getCarsForUser/" + username, {
    method: "GET",
  });
}

function retrieveUserInformation(id) {
  return fetch(APIURL + "/getUser/" + id, {
    method: "GET",
  });
}

function retrieveUsers() {
  return fetch(APIURL + "/getUsers", {
    method: "GET",
  });
}

export default userService;
