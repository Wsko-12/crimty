//v0.0.1
/*

- добавить окна перехода



*/

let makeRoomList = function(object) {
  //object = {'id':{id:'id',name:'name',onlineUsers:0}};
  let list = document.getElementById('roomsList');
  list.innerHTML = '';
  for (let room in object) {
    let thisRoom = object[room];
    let item =
      `<li class="rooms__list-item" onclick="connectToRoom('${thisRoom.id}')">
      <p class="rooms__list-item__title">
        ${thisRoom.name}
      </p>
      <p class="rooms__list-item__onlineUser">
        online: ${thisRoom.onlineUsersCount}
      </p>
    </li>`

    list.insertAdjacentHTML('beforeEnd', item);
  };
};


function refreshRoomsList() {
  socket.emit('userRequestsRoomsList');
};
socket.on('userRequestsRoomsList-True', function(data) {
  //data = {'id':{id:'id',name:'name',onlineUsers:0}}
  document.getElementById('roomsSection').style.display = 'flex';
  makeRoomList(data);
});


let connectToRoom = function(roomId) {
  let pack = {
    roomId: roomId,
    userUploadTextures: USER_FLAGS.uploadedTextures,
  };
  loadingScreenSwitch(true);
  socket.emit('userConnectToRoom', pack);
};

socket.on('userConnectToRoom-Load', function(data) {

  //data = {textures:[],roomId:roomId}
  if (!USER_FLAGS.uploadedTextures) {
    loadingScreenSwitch(false);
    TEXTURE_LIBRARY = data.textures;
    LOAD_TEXTURES().then(result => {
      socket.emit('userConnectToRoom-Load-True', data.roomId);
    });
  } else {
    socket.emit('userConnectToRoom-Load-True', data.roomId);
  };
});


socket.on('userConnectToRoom-True', function() {
  loadingScreenSwitch(false);
});
