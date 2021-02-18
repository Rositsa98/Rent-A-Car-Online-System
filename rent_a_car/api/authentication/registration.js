let User = require("../users/user.model");

exports.register = function (req, res) {
  const newuser = new User(req.body);
  console.log(newuser);

  if (newuser.password != newuser.password2) {
    console.log("pass not match");
    return res.status(400).json({ message: "password not match" });
  }

  User.findOne({ email: newuser.email }, function (err, user) {
    if (user) {
      console.log("user exists");
      return res.status(400).json({ auth: false, message: "email exits" });
    }

    console.log(err);

    newuser.save((err, doc) => {
      if (err) {
        console.log(err);
        return res.status(400).json({ success: false });
      } else {
        console.log(doc);
        res.status(200).json({
          succes: true,
          user: doc,
        });
        console.log(doc);
      }
    });
  });
};
