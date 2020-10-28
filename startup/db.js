const mongoose = require("mongoose");
const config = require("config");

module.exports = function () {
  const db = config.get("db");
  console.log(db);
  mongoose.set("useCreateIndex", true);
  mongoose
    .connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => console.log(`Connected to ${db}...`));
};


