const DB = require('./database.js');


let signIn = function(data, socket, ONLINE_USERS) {
  DB.findLogin(data.login).then(result => {
    if (result === null) {
      socket.emit('userSignIn_False');
    } else {
      if (result.password != data.password) {
        socket.emit('userSignIn_False');
      } else {
        if (ONLINE_USERS[data.login]) {
          socket.emit('userSignIn_False-alreadyOnline');
        } else {
          let pack = result;
          delete pack._id;
          delete pack.password;
          ONLINE_USERS[pack.login] = {
            socket: socket.id,
            id: pack.id,
          };
          socket.emit('userSignIn_True', pack);
        };
      };
    };
  });
};

let signRegister = function(data, socket, ONLINE_USERS) {
  DB.findLogin(data.login).then(result => {
    if (result === null) {
      DB.registOne(data.login, data.password).then(result => {
        signIn(result, socket, ONLINE_USERS);
      });
    } else {
      socket.emit('userSignRegistration_False')
    };
  });
};

module.exports.signIn = signIn;
module.exports.signRegister = signRegister;
