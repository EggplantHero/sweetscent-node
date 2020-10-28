const { createLogger, format, transports } = require("winston");
require("winston-mongodb");
require("express-async-errors");

module.exports = createLogger({
  transports: [
    new transports.Console({ level: "error" }),
    new transports.File({ filename: "error.log", level: "error" }),
    new transports.File({
      filename: "verbose.log",
      level: "verbose",
    }),
    new transports.MongoDB({
      db: "mongodb://localhost/shiny-tracker",
      options: {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
    }),
  ],
  exceptionHandlers: [
    new transports.Console(),
    new transports.File({ filename: "uncaughtExceptions.log" }),
  ],
  rejectionHandlers: [
    new transports.Console(),
    new transports.File({ filename: "unhandledRejections.log" }),
  ],
});
