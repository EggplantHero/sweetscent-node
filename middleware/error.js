const winston = require("winston");
const logger = require("../startup/logger");

module.exports = function (err, req, res, next) {
  logger.log({
    level: "error",
    message: err.message,
  });
  logger.log({
    level: "verbose",
    message: err.stack,
  });
  res.status(500).send("Something failed.");
};
