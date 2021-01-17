const config = {
  apiUrl: "http://localhost:3001/api",
};

exports.get = function get(env) {
  return config[env] || config.default;
};
