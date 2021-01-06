const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const app = express();

const cors = require("cors");

app.use(cors());
const properties = require("./config/config");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

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
app.listen((PORT = process.env.PORT || 3001), (req, res) => {
  console.log(`Server is running on ${PORT} port.`);
});
