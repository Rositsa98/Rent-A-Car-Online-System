let Users = require("./user.dao");

exports.createUser = function (req, res, next) {
  let user = new Users(req.body);

  Users.create(user, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "User created successfully",
    });
  });
};

exports.getUsers = function (req, res, next) {
  Users.get({}, function (err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};

exports.getUserByUsername = function (req, res, next) {
  Users.get({ username: req.params.username }, function (err, users) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      users: users,
    });
  });
};

const bcrypt = require("bcrypt");

exports.updateUser = function (req, res, next) {
  let user = {
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 10),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    roles: req.body.roles,
    password2: req.body.password2,
  };

  Users.update({ _id: req.params.id }, user, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "User updated successfully",
    });
    console.log("UPDATED" + user);
  });
};

exports.removeUser = function (req, res, next) {
  Users.delete({ _id: req.params.id }, function (err, user) {
    if (err) {
      res.json({
        error: err,
      });
    }
    res.json({
      message: "User deleted successfully",
    });
  });
};
