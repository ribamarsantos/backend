const assert = require('assert');

var UserRepository = require('../persistencia/user_mongo');

function NegociosUser() {
  this.persistencia = new UserRepository();
}

NegociosUser.prototype.add = async function (puser) {
  console.log(puser);
  if (puser.name.length < 3) {
    throw new Error('Nome deve ter mais de três caracteres.');
  }

  if (puser.cpf.length !== 11) {
    throw new Error('CPF inválido');
  }

  if (puser.login.length == 0) {
    throw new Error('Login não informado');
  }

  try {
    await this.persistencia.findByLogin(puser.login);
  } catch (e) {
    await this.persistencia.add(puser);
  }
};

NegociosUser.prototype.findAll = UserRepository.prototype.findAll;
NegociosUser.prototype.findByLogin = UserRepository.prototype.findByLogin;
NegociosUser.prototype.update = async function (user) {

  try {
    await this.persistencia.update(user);
  }catch (e) {
    throw new Erro('Erro ao atualizar');
  }
};

NegociosUser.prototype.delete = async function (login) {

  try {
    await this.persistencia.delete(login);
  }catch (e) {
    throw new Erro('Erro ao excluir');
  }
};

module.exports = NegociosUser;
