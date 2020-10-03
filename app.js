const express = require('express');
const app = express();
const http = require('http').createServer(app);
const DB = require('./my_modules/database.js');
const SIGN = require('./my_modules/signServer_v0.0.1.js');

DB.connectDb();
console.log('db connected');


http.listen(3000, () => {
  console.log('Server started');
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/client/index.html');
});

app.use('/client', express.static(__dirname + '/client'));

const io = require('socket.io')(http);







let SOCKET_LIST = {};
let ONLINE_USERS = {};



io.sockets.on('connection', function(socket) {
  SOCKET_LIST[socket.id] = socket;
  socket.on('userSignIn', function(data) {
    //data = {login:'log',password:'pas'}
    SIGN.signIn(data, socket, ONLINE_USERS);
  });
  socket.on('userSignRegistration', function(data) {
    //data = {login:'log',password:'pas'}
    SIGN.signRegister(data, socket, ONLINE_USERS);
  });









  socket.on('disconnect', function() {
    console.log(`socket disconnected: ${socket.id}`);
    delete SOCKET_LIST[socket.id];
  });
});
