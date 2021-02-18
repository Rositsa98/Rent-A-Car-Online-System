// module.exports = {
//   PORT: 3000,
//   DB: "mongodb://localhost:27017/rent_a_car",
// };

const config = {
  production: {
    SECRET: process.env.SECRET,
    DATABASE: process.env.MONGODB_URI,
  },
  default: {
    SECRET: "mysecretkey",
    DATABASE: "mongodb://localhost:27017/rent_a_car_",
  },
};

exports.get = function get(env) {
  return config[env] || config.default;
};
