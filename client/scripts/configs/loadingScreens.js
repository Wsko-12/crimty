let loadingScreen = document.getElementById('loadingScreen');

function loadingScreenSwitch(bool) {
  if (bool) {
    loadingScreen.style.display = 'block';
  } else {
    loadingScreen.style.display = 'none';
  };
};
