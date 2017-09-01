var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

function UserRepository() {

  this.schema = mongoose.Schema({
    name: String,
    cpf: String,
    login: { type: String, required: true, unique: true },
    senha: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
  });
  //this.conn = mongoose.connect('mongodb://demo:pringlesdb@ds015194.mlab.com:15194/standupmeeting');
  this.conn = mongoose.connect('mongodb://localhost/libraryApp');
  mongoose.model('User', this.schema);
}

UserRepository.prototype.add = async function (user) {
  await mongoose.model('User').create(user, function (err, user) {
    if (err) {
      throw new Error(err);
    }
  });
};

// async function
UserRepository.prototype.delete = async function (login) {
  await mongoose.model('User').findOneAndRemove({ login: login },
    function (err, user) {
      if (err)
         throw new Error(err);
    });
};

UserRepository.prototype.findByLogin = async function (_login) {
  console.log(_login);
  var _user = null;
  await mongoose.model('User').findOne({ login: _login }, function (err, user) {
      if (err) throw new Error(err);
      _user = user;
    }
  );
  if (_user == null) throw new Error();
  return _user;
};

UserRepository.prototype.update = async function (user) {
  await mongoose.model('User').findOneAndUpdate({ login: user.login }, user, function (err) {
    if (err) {
      throw new Error(err);
    }
  });
};

UserRepository.prototype.findAll = async function () {
  var _users = [];

  var query = mongoose.model('User').find();
  await query.sort({ createdOn: 'desc' })
            .limit(12)
            .exec(function (err, users) {
    if (err) {
      throw new Error(err);
    }

    _users = users;
  });

  return _users;

};

module.exports = UserRepository;
