// Importer mongoose
const mongoose = require("mongoose");

// Création d'une const qui va accueillir le schéma

const Users = new mongoose.Schema({
  userName: String,
  email: String,
  password: String,
});

// Export du model mongoose avec comme premier paramètre le nom de la collection et en deuxieme paramètre notre schéma crée (User)
module.exports = mongoose.model("customers", Users);