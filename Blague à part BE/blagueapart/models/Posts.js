// Importer mongoose
const mongoose = require("mongoose");

// Création d'une const qui va accueillir le schéma

const Posts = new mongoose.Schema({
  joke: String,
  author: String,
  likes: Number,
});

// Export du model mongoose avec comme premier paramètre le nom de la collection et en deuxieme paramètre notre schéma crée (User)
module.exports = mongoose.model("Jokes", Posts);