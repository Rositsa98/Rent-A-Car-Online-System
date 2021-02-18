const Users = require("../api/users/user");
const Cars = require("../api/cars/car");
const Login = require("../api/authentication/login");
const Registration = require("../api/authentication/registration");
const Profile = require("../api/authentication/profile");
const Logout = require("../api/authentication/logout");
const { auth } = require("../api/middlewares/auth");
var cors = require("cors");

module.exports = function (router) {
  router.post("/addUser", Users.createUser);
  router.get("/getUsers", Users.getUsers);
  router.get("/getUserByUsername/:username", Users.getUserByUsername);
  router.get("/getUser/:id", Users.getUserById);
  router.put("/updateUser/:id", Users.updateUser);
  router.delete("/removeUser/:id", Users.removeUser);

  router.post("/addCar", Cars.createCar);
  router.get("/getCars", Cars.getCars);
  router.get("/getCar/:id", Cars.getCarById);
  router.put("/updateCar/:id", Cars.updateCar);
  router.delete("/removeCar/:id", Cars.removeCar);
  router.get("/getCarsForUser/:username", Cars.getCarsForUser);
  router.get("/releaseCar/:id", Cars.releaseCar);

  router.post("/login", cors(), Login.login);
  router.post("/register", Registration.register);
  router.get("/profile", auth, Profile.profile);
  router.get("/logout", auth, Logout.logout);
};
