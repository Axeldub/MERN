var express = require('express');
var router = express.Router();


const publicControllers = require("../controllers/public");

router.post("/signup", publicControllers.register);
router.post("/login", publicControllers.login);
// router.post("/form",publicControllers.form);

module.exports = router;
