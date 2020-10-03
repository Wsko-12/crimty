const signForm = document.getElementById('signForm');
const signRegisterButton = document.getElementById('signRegisterButton')
signForm.onsubmit = function(e) {
  e.preventDefault();

  let pack = {
    login: signForm.login.value,
    password: signForm.password.value,
  }
  socket.emit('userSignIn', pack);
  socket.on('userSignIn_False', function() {
    alert('incorrect login or password');
  });
  socket.on('userSignIn_False-alreadyOnline', function() {
    alert('user is already online');
  });
};

socket.on('userSignIn_True', function(data) {
  console.log(data);
});


signRegisterButton.onclick = function() {
  let pack = {
    login: signForm.login.value,
    password: signForm.password.value,
  };
  socket.emit('userSignRegistration', pack);
};
