var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser");
var cors = require("cors");
var passport = require("passport");

const registrationRoutes = require("./routes/registration");
const userRoutes = require("./routes/user");
const jobRoutes = require("./routes/job");
const searchRoutes = require("./routes/search");
const messageRoutes = require("./routes/message");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
