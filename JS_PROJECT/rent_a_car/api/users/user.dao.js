const mongoose = require("mongoose");
const confiq = require("../../config/config").get(process.env.NODE_ENV);
let userSchema = require("./user.model");

const bcrypt = require("bcrypt");
const salt = 10;
const jwt = require("jsonwebtoken");

userSchema.pre("save", function (next) {
  let user = this;

  if (user.isModified("password")) {
    bcrypt.genSalt(salt, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

userSchema.methods.comparepassword = function (password, cb) {
  bcrypt.compare(password, this.password, function (err, isMatch) {
    if (err) return cb(next);
    cb(null, isMatch);
  });
};

// generate token
userSchema.methods.generateToken = function (cb) {
  let user = this;
  const token = jwt.sign(user._id.toHexString(), confiq.SECRET);

  user.token = token;
  user.save(function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

//delete token
userSchema.methods.deleteToken = function (token, cb) {
  let user = this;

  user.update({ $unset: { token: true } }, function (err, user) {
    if (err) return cb(err);
    cb(null, user);
  });
};

userSchema.statics = {
  create: function (data, cb) {
    let user = new this(data);
    user.save(cb);
  },

  get: function (query, cb) {
    this.find(query, cb);
  },

  getByUserName: function (query, cb) {
    this.find(query, cb);
  },

  getUserById: function (query, cb) {
    this.findOne(query, cb);
  },

  update: function (query, updateData, cb) {
    this.findOneAndUpdate(query, { $set: updateData }, { new: true }, cb);
  },

  delete: function (query, cb) {
    this.findOneAndDelete(query, cb);
  },

  findByToken: function (token, cb) {
    let user = this;

    jwt.verify(token, confiq.SECRET, function (err, decode) {
      user.findOne({ _id: decode, token: token }, function (err, user) {
        if (err) return cb(err);
        cb(null, user);
      });
    });
  },
};

let userModel = mongoose.model("Users", userSchema);
module.exports = userModel;
