let User = require("../users/user.model");

exports.login = function (req, res) {
  let token = req.cookies.auth;
  User.findByToken(
    token,
    (err, user) => {
      if (err) return res(User);
      User.findOne({ email: req.body.email }, function (err, user) {
        if (!user)
          return res.json({
            isAuth: false,
            message: " Auth failed ,email not found",
          });

        user.comparepassword(req.body.password, (err, isMatch) => {
          if (!isMatch)
            return res.json({
              isAuth: false,
              message: "password doesn't match",
            });

          user.generateToken((err, user) => {
            if (err) return res.status(400).send(err);
            else {
              console.log(user);
              return res.json({
                isAuth: true,
                username: user.username,
                id: user._id,
                email: user.email,
                roles: user.roles,
              });
            }
          });
        });
      });
    }
    //}
  );
};
