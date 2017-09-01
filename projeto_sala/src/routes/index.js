var express = require('express');

var indexRoute = express.Router();

indexRoute.get('/', function (req, res) {
  res.render('index');

});

indexRoute.get('/newuser', function (req, res) {
  res.render('newUser');

});

module.exports = indexRoute;
