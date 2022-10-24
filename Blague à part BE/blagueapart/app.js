
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var publicRouter = require('./routes/public');
var postsRouter = require('./routes/posts');
const mongoose = require("mongoose");

var app = express();


mongoose.connect("mongodb://127.0.0.1/blagueapart", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => {
  console.log("database connected");
});


app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', publicRouter);
app.use('/posts', postsRouter);


module.exports = app;
