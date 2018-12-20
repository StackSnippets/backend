const jwt = require("jsonwebtoken");

exports.generate = function(data) {
  return jwt.sign(data, process.env.TOKEN_SECRET, { expiresIn: "24h" });
};

exports.verify = function(token) {
  return jwt.verify(token, process.env.TOKEN_SECRET);
};
