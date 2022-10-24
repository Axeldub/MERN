const jwt = require("jsonwebtoken");
const middleware = {
  authentication(req, res, next) {
    const token = String(req.get("Authorization")).split(" ")[1];

    if (token) {
      jwt.verify(token, "secret", (err, data) => {
        if (err) {
          res.status(401).json({ message: "Error on token authentication" });
        } else {
          req.user = data;
          next();
        }
      });
    } else {
      res.status(404).json({ message: "Not Found" });
    }
  },
};

module.exports = middleware;
