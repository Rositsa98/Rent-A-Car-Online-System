const config = {
  apiUrl: "http://localhost:3001/api",
  url: "http://localhost:3000",
};

exports.get = function get(env) {
  return config[env] || config.default;
};
