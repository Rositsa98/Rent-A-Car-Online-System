const Users = require("../api/users/user.controller");
const Cars = require("../api/cars/car.controller");
const Login = require("../api/authentication/login.controller");
const Registration = require("../api/authentication/registration.controller");
const Profile = require("../api/authentication/profile.controller");
const Logout = require("../api/authentication/logout.controller");
const { auth } = require("../api/middlewares/auth");

module.exports = function (router) {
  router.post("/addUser", Users.createUser);
  router.get("/getUsers", Users.getUsers);
  router.get("/get/:username", Users.getUserByUsername);
  router.put("/updateUser/:id", Users.updateUser);
  router.delete("/removeUser/:id", Users.removeUser);

  router.post("/addCar", Cars.createCar);
  router.get("/getCars", Cars.getCars);
  router.get("/getCarById/:id", Cars.getCarById);
  router.put("/updateCar/:id", Cars.updateCar);
  router.delete("/removeCar/:id", Cars.removeCar);

  router.post("/login", Login.login);
  router.post("/register", Registration.register);
  router.get("/profile", auth, Profile.profile);
  router.get("/logout", auth, Logout.logout);
};
