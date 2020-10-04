//v0.0.2
/*
  - Дописать скрытый пароль
  - добавить окна перехода


*/

const signForm = document.getElementById('signForm');
const signRegisterButton = document.getElementById('signRegisterButton')
signForm.onsubmit = function(e) {

  e.preventDefault();
  loadingScreenSwitch(true);

  let pack = {
    login: signForm.login.value,
    password: signForm.password.value,
  };
  socket.emit('userSignIn', pack);
  socket.on('userSignIn_False', function() {
    alert('incorrect login or password');
    loadingScreenSwitch(false);
  });
  socket.on('userSignIn_False-alreadyOnline', function() {
    alert('user is already online');
    loadingScreenSwitch(false);
  });
};

socket.on('userSignIn_True', function(data) {
  //data = {id: "user_id",login: "log",}
  document.getElementById('signSection').style.display = 'none';
  USER = data;
  refreshRoomsList();
  USER_FLAGS.logged = true;
  loadingScreenSwitch(false);
});


signRegisterButton.onclick = function() {
  let pack = {
    login: signForm.login.value,
    password: signForm.password.value,
  };
  loadingScreenSwitch(true);
  socket.emit('userSignRegistration', pack);
};
