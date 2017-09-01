var express = require('express');

var UserController = require('../controller/user_controller');
var userCtrl = new UserController();

var userRoute = express.Router();

userRoute.get('/', function (req, res) {
  userCtrl.findAll().then(function (users) {
    res.status(200).render('users', { data: users });
    //res.status(200).json('users', { data: users });
    //res.status(200).json(users);
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

userRoute.post('/add', function (req, res) {
  userCtrl.add(req.body).then(function (result) {
    res.status(200).redirect('/users');
  }).catch(function (err) {
    res.status(404).json({ error: err.message });
  });
});

userRoute.get('/findAll', function (req, res) {
  userCtrl.findAll().then(function (users) {
    //res.status(200).json({ data: users });
    res.status(200).json(users);
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

userRoute.get('/findByLogin/:login', function (req, res) {
  userCtrl.findByLogin(req.params.login).then(function (user) {
    //res.status(200).json({ data: users });
    res.render('editUser', { data: user });
  }).catch(function (err) {
    res.status(500).json({ error: err.message });
  });
});

userRoute.post('/update', function (req, res) {
  userCtrl.update(req.body).then(function (result) {
    res.status(200).json({ data: result });
  }).catch(function (err) {
    res.status(404).json({ error: err.message });
  });
});

userRoute.delete('/delete/:login', function (req, res) {
      console.log(req.params.login);
      userCtrl.delete(req.params.login).then(function () {
        res.status(204);
      }).catch(function (err) {
        console.log('ERRO' + err.message);
        res.status(404).json({ error: err.message });
      });
    });

module.exports = userRoute;
