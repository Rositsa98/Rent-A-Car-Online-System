let User = require("../users/user.dao");

//logout user
exports.logout = function (req, res, next) {
  let resp1 = req.token;
  let resp2 = req.user.token;
  req.user.deleteToken(req.token, (err, user) => {
    if (err) return res.status(400).send(err);
    res.send(resp1 + "\n" + req.user.token);
  });
};
