var NegociosUser = require('../negocio/negocios_user');
var User = require('../entity/user');

function UserCtrl() {
  this.usernegocio = new NegociosUser();
};

UserCtrl.prototype.add = async function(user) {
  await this.usernegocio.add(user);
};

UserCtrl.prototype.findAll = async function () {

  return await this.usernegocio.findAll();

};

UserCtrl.prototype.findByLogin = async function (login) {

  return await this.usernegocio.findByLogin(login);

};

UserCtrl.prototype.update = async function (user) {
  await this.usernegocio.update(user);
};

UserCtrl.prototype.delete = async function (login) {
  await this.usernegocio.delete(login);
};

module.exports = UserCtrl;
