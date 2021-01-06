// get logged in user
let User = require("../users/user.dao");
const { auth } = require("../middlewares/auth");

exports.profile = function (req, res) {
  res.json({
    isAuth: true,
    id: req.user._id,
    email: req.user.email,
    name: req.user.firstName + " " + req.user.lastName,
  });
};
