const mongoose = require("mongoose");

const User = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
  name: String,
  firstName: String,
});

module.exports = mongoose.model("Users", User);
