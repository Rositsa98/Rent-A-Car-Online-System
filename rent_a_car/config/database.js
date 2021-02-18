//require mongoose module
let mongoose = require("mongoose");

//require chalk module to give colors to console text
let chalk = require("chalk");

//require database URL from properties file
const config = require("./config");
let dbURL = config.get(process.env.NODE_ENV).DATABASE;

let connected = chalk.bold.cyan;
let error = chalk.bold.yellow;
let disconnected = chalk.bold.red;
let termination = chalk.bold.magenta;

//export this function and imported by server.js
module.exports = function () {
  mongoose.connect(dbURL);

  mongoose.connection.on("connected", function () {
    console.log(connected("Mongoose default connection is open to ", dbURL));
  });

  mongoose.connection.on("error", function (err) {
    console.log(
      error("Mongoose default connection has occured " + err + " error")
    );
  });

  mongoose.connection.on("disconnected", function () {
    console.log(disconnected("Mongoose default connection is disconnected"));
  });

  process.on("SIGINT", function () {
    mongoose.connection.close(function () {
      console.log(
        termination(
          "Mongoose default connection is disconnected due to application termination"
        )
      );
      process.exit(0);
    });
  });
};
