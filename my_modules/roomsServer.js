//v0.0.1

const DB = require('./database.js');


let requestRoomList = function(socket, ROOMS_LIST) {
  let pack = {};
  for (let room in ROOMS_LIST) {
    thisRoom = ROOMS_LIST[room];
    pack[thisRoom.id] = {};
    pack[thisRoom.id].id = thisRoom.id;
    pack[thisRoom.id].name = thisRoom.name;
    pack[thisRoom.id].onlineUsersCount = thisRoom.onlineUsersCount;
  };
  socket.emit('userRequestsRoomsList-True', pack);
};

let updateOnlineUsersForUsersInRoom = function(room, SOCKET_LIST) {
  for (let user in room.onlineUsers) {
    let thisUser = room.onlineUsers[user]
    let socket = SOCKET_LIST[thisUser.socket];

    socket.emit('updateRoomOnlineUsers', room.onlineUsers); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  };
};

let userConnectToRoom = function(socket, roomID, ROOMS_LIST, ONLINE_USERS, SOCKET_LIST) {
  let user = {
    login: SOCKET_LIST[socket.id].appUserLogin,
    socket: socket.id,
  }
  ROOMS_LIST[roomID].onlineUsersCount += 1;
  ROOMS_LIST[roomID].onlineUsers[user.login] = user;

  updateOnlineUsersForUsersInRoom(ROOMS_LIST[roomID], SOCKET_LIST);

  ONLINE_USERS[user.login].onRoom = roomID;

  socket.emit('userConnectToRoom-True', ROOMS_LIST[roomID]); //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};


let userDisconnectFromRoom = function(roomID, userLogin, ROOMS_LIST, ONLINE_USERS, SOCKET_LIST) {
  ROOMS_LIST[roomID].onlineUsersCount -= 1;
  delete ROOMS_LIST[roomID].onlineUsers[userLogin];
  delete ONLINE_USERS[userLogin].onRoom;
  updateOnlineUsersForUsersInRoom(ROOMS_LIST[roomID], SOCKET_LIST);
};




module.exports.requestRoomList = requestRoomList;
module.exports.userConnectToRoom = userConnectToRoom;
module.exports.userDisconnectFromRoom = userDisconnectFromRoom;
