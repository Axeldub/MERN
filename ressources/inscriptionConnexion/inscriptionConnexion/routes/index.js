var express = require("express");
var router = express.Router();
const publicController = require("../controllers/public");
const middleware = require("../middleware/middleware");

/* INSCRIPTION. */
router.post("/inscription", publicController.inscription);

// Connexion
router.post("/connexion", publicController.connexion);

// Get Contact
router.get("/contact", middleware.authentication, publicController.getContact);

module.exports = router;
