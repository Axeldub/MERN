var express = require('express');
var router = express.Router();

const postsControllers = require("../controllers/posts");

router.get("/", postsControllers.posts);
router.post("/addPost", postsControllers.addPost);

module.exports = router;