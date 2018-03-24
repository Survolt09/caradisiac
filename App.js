////////////////////////////////////////
//               App.js               //
////////////////////////////////////////

var express = require('express');
var app = express();


var UserController = require('./Controller');
app.use('/', UserController);
module.exports = app;
