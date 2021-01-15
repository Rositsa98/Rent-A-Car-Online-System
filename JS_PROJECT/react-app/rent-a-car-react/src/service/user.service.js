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
  updateUser,
  deleteUser,
  getCarsForUser,
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

//TODO - obtain result
function register(user) {
  let details = {
    username: user.username,
    password: user.password,
    firstName: user.firstName,
    lastName: user.lastName,
    password2: user.password2,
    email: user.email,
    roles: localStorage.getItem("roles"),
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

  return fetch("http://localhost:3001/api/register", {
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
    roles: "normal - user", //TODO
    imageUrl: user.imageUrl,
  };

  let formBody = [];
  for (let property in details) {
    let encodedKey = encodeURIComponent(property);
    let encodedValue = encodeURIComponent(details[property]);
    formBody.push(encodedKey + "=" + encodedValue);
  }
  formBody = formBody.join("&");

  return fetch("http://localhost:3001/api/updateUser/" + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    },
    body: formBody,
  });
}

function deleteUser(id) {
  console.log("deleting user" + id);

  return fetch("http://localhost:3001/api/removeUser/" + id, {
    method: "DELETE",
  });
}

function getCarsForUser(username) {
  return fetch(APIURL + "/getCarsForUser/" + username, {
    method: "GET",
  });
}

export default userService;
