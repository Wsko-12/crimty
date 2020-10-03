//Сразу подключать SOCKET_LIST ONLINE_USERS ROOMS_LIST




const express = require('express');
const app = express();
const http = require('http').createServer(app);
const DB = require('./my_modules/database.js');
const SIGN = require('./my_modules/signServer.js');
const ROOM = require('./my_modules/roomsServer.js');
const io = require('socket.io')(http);





let SOCKET_LIST = {},
  ONLINE_USERS = {},
  ROOMS_LIST = {};









DB.connectDb().then(result => {
  console.log('db connected');
  DB.findAllRooms().then(result => {
    ROOMS_LIST = result;
    startServer();
  });
});





function startServer() {
  http.listen(3000, () => {
    console.log('Server started');
  });

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
  });

  app.use('/client', express.static(__dirname + '/client'));


};









io.sockets.on('connection', function(socket) {
  console.log(`socket connected: ${socket.id}`);



  SOCKET_LIST[socket.id] = socket;
  socket.on('userSignIn', function(data) {
    //data = {login:'log',password:'pas'}
    SIGN.signIn(data, socket, ONLINE_USERS, SOCKET_LIST);
  });
  socket.on('userSignRegistration', function(data) {
    //data = {login:'log',password:'pas'}
    SIGN.signRegister(data, socket, ONLINE_USERS, SOCKET_LIST);
  });
  socket.on('userRequestsRoomsList', function() {
    ROOM.requestRoomList(socket, ROOMS_LIST);
  });





  socket.on('userConnectToRoom', function(data) {
    //data = {roomId:roomId,userUploadTextures:true}
    if (!data.userUploadTextures) {
      DB.loadTexturePack().then(result => {
        let pack = {
          textures: result,
          roomId: data.roomId,
        };
        socket.emit('userConnectToRoom-Load', pack);
      });
    } else {
      let pack = {
        roomId: data.roomId,
      };
      socket.emit('userConnectToRoom-Load', pack);
    };
  });

  socket.on('userConnectToRoom-Load-True', function(data) {
    //data = roomId
    ROOM.userConnectToRoom(socket, data, ROOMS_LIST, ONLINE_USERS, SOCKET_LIST);
  });




  socket.on('disconnect', function() {
    console.log(`socket disconnected: ${socket.id}`);

    let userLogin = SOCKET_LIST[socket.id].appUserLogin;

    if (ONLINE_USERS[userLogin]) {
      if (ONLINE_USERS[userLogin].onRoom) {
        let roomID = ONLINE_USERS[userLogin].onRoom;
        ROOM.userDisconnectFromRoom(roomID, userLogin, ROOMS_LIST, ONLINE_USERS, SOCKET_LIST);
      };
      delete ONLINE_USERS[SOCKET_LIST[socket.id].appUserLogin];
    };

    delete SOCKET_LIST[socket.id];
  });
});
