const jwt = require("jsonwebtoken");
const Posts = require("../models/Posts");
const bddjokes = require("../public/bddjokes.json")

const postsControllers = {

    addPost: (req, res) => {
        const token = String(req.get("Authorization")).split(" ")[1];

        if (token) {
            jwt.verify(token, "secret", (err, data) => {
                if (err) {
                    res.status(401).json({ message: "Error on token authentication" });
                } else {

                     
                        const addPost = new Posts({
                            joke: req.body.joke,
                            author: req.body.author,
                            likes: 0,
                        });
                        addPost.save((err) => {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                Posts.find({}, (err, data) => {
                                    if (err) {
                                        res.status(404).json({ message: "Oups!" });
                                    } else {
                                        res.json({ message: "Votre blague a été créé!", joke: data });
                                    };
                                });
                            };
                        });

                    }
                
            });
        } else {
            res.json({message:"Pas de token!"})
        }
    },

    posts: (req, res) => {
        const token = String(req.get("Authorization")).split(" ")[1];

        if (token) {
            jwt.verify(token, "secret", (err, data) => {
                if (err) {
                    res.status(401).json({ message: "Error on token authentication" });
                } else {
                    Posts.find((err, Posts) => {
                        if (Posts) {
                            res.json(Posts);
                        } else {
                            if (err) {
                                res.status(422).json(err);
                            };
                        };
                    });
                };
            });
        } else {
            res.json({message:"Pas de token!"})
        }
    }
};

module.exports = postsControllers;