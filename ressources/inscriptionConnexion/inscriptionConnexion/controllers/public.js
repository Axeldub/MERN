// Importer notre modèle User
const User = require("../models/User");
// Import de bcrypt
const bcrypt = require("bcrypt");
// Import de jsonwebtoken
const jwt = require("jsonwebtoken");

const userController = {
  // POST
  inscription: (req, res) => {
    // Récupérer les infos du body
    let { userName, name, email, firstName, password } = req.body;

    bcrypt.hash(password, 10, (err, hash) => {
      const newUser = new User({
        userName: userName,
        name: name,
        firstName: firstName,
        email: email,
        password: hash,
      });

      newUser.save((err) => {
        if (err) {
          res.status(404).json({
            message: "Erreur lors de l'inscription veuillez réessayer",
          });
        } else {
          res.json({ message: "Bienvenue et merci pour votre inscription" });
        }
      });
      // Le paramètre hash est le mot de passe crypté par le module bcrypt
    });
  },
  //   POST
  connexion: (req, res) => {
    // Récupération du body
    let { password, email } = req.body;
    // Trouvé l'utilisateur grâce à son mail dans la BDD
    User.findOne({ email: email }, async (err, user) => {
      if (err) {
        res.status(404).json({
          message: "Aucun utilisateur trouvé veuillez vous inscrire.",
        });
      } else {
        const match = await bcrypt.compare(password, user.password);

        if (match == true) {
          const token = jwt.sign(
            {
              userId: user._id,
            },
            "secret",
            { expiresIn: "24h" }
          );

          res.json({ message: "Connecté", token: token });
        } else {
          res.status(404).json({ message: "Mot de passe incorrect" });
        }
      }
    });
  },

  getContact: (req, res) => {
    User.find({}, (err, data) => {
      res.json(data);
    });
  },
};

module.exports = userController;
