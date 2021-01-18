const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const socketio = require("socket.io");

const app = express();

const properties = require("./config/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({ origin: "http://localhost:3000" }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const db = require("./config/database");
db();

//user routes
const routes = require("./routes/routes");

// Error handling
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Origin,Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,Authorization"
  );
  next();
});

//initialise express router
const router = express.Router();
// use express router
app.use("/api", router);
//call routing
routes(router);

//index page to go to login - TODO - point it to /login?
app.get("/", function (req, res) {
  res.status(200).send(`Welcome to rent-a-car api!`);
});

// intialise server
const server = app.listen((PORT = process.env.PORT || 3001), (req, res) => {
  console.log(`Server is running on ${PORT} port.`);
});

//initialize socket for the server
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

let Cars = require("./api/cars/car.dao");
let carCount;
// Cars.countDocuments({ rentedBy: { $ne: null } }, function (err, count) {
//   carCount = count;
// });

function getCarsCount() {
  return Cars.countDocuments({ rentedBy: { $ne: null } }, function (
    err,
    count
  ) {
    carCount = count;
  });
}
io.on("connection", (socket) => {
  console.log("anyone has connected");
  console.log("rented cars on conn: " + getCarsCount());
  io.sockets.emit("statistics_update", {
    message: "update statistics",
    carCount: carCount, //here to emit promise of the carCount.get
  });

  socket.on("disconnect", () => {
    // console.log("user disconnected");
  });

  //handle the new message event
  socket.on("rent_a_car", (data) => {
    console.log(data.user + " rented car " + data.car);

    Cars.findById(data.car, function (err, car) {
      car.rentedBy = data.user;
      car
        .save()
        .then(() => {
          return Cars.countDocuments({ rentedBy: { $ne: null } }, function (
            err,
            count
          ) {
            return count;
          });
        })
        .then((carCountt) => {
          console.log("carCountt is " + carCountt);
          io.sockets.emit("statistics_update", {
            message: "update statistics",
            carCount: carCountt,
          });
        });
    });
  });
});
