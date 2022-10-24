const jwt = require("jsonwebtoken");
const Users = require("../models/Users")
const bcrypt = require("bcrypt");

const publicControllers = {
    register: (req, res) => {
        let {userName, email, password} = req.body;

        bcrypt.hash(password, 10, (err, hash) => {
            const newContact = new Users({
              userName: userName,
              email: email,
              password: hash,
            });
      
            newContact.save((err) => {
              if (err) {
                res.status(404).json({message: "Tous les champs sont obligatoires"});
              } else {
                res.json({ message: "Bienvenu et bonne barre" });
              }
            });
          
        });
        },

    login: (req, res) => {
      let { password, userName } = req.body;
    // Trouvé l'utilisateur grâce à son mail dans la BDD
    Users.findOne({ userName: userName }, async (err, user) => {
      if (err) {
        res.status(404).json({
          message: "Aucun utilisateur trouvé.",
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

          res.json({ message: "Vous êtes connecté", token: token });
        } else {
          res.status(404).json({ message: "Mot de passe incorrect" });
        }
      }
    });
  },
  

    // form: (req, res) => {

    // }
};

module.exports = publicControllers;