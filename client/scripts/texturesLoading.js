function loadingTextureScreenSwitch(bool) {
  let screen = document.getElementById('loadingTextureScreen');
  if (bool) {
    screen.style.display = 'flex';
  } else {
    screen.style.display = 'none';
  };
};


let loadingTextureScreen_showTextureProcess = function(procents, group, texture) {
  let namesElemt = document.getElementById('loadingTextureScreen_TextureNames');
  let processElement = document.getElementById('loadingTextureScreen_TextureProcess');

  namesElemt.innerHTML = `${group}: ${texture}`;
  processElement.style.width = `${procents}%`;
};


let loadingTextureScreen_showGroupProcess = function(packProcess, texturesProcess, globalLoadingPart) {
  let element = document.getElementById('loadingTextureScreen_GroupProcess');
  let part = Math.round(packProcess / globalLoadingPart);
  let loading = ((globalLoadingPart * part) - globalLoadingPart) + globalLoadingPart * (texturesProcess / 100);

  element.innerHTML = `${Math.round(loading)}%`;
};



async function LOAD_TEXTURES() {
  let globalLoadingPart = Math.floor(100 / TEXTURE_LIBRARY.length);
  loadingTextureScreenSwitch(true);
  let packLength = TEXTURE_LIBRARY.length;
  let packIndex = 0;
  openPack();

  function openPack() {


    if (TEXTURE_LIBRARY[packIndex] === undefined) {
      console.log('load complite');
      return;
    };
    let groupName = TEXTURE_LIBRARY[packIndex].group;
    texIMG[groupName] = {};

    let texturePack = TEXTURE_LIBRARY[packIndex].textures;
    let texturePackLength = texturePack.length;
    let textureIndex = 0;
    loadTexture();

    function loadTexture() {


      let texture = TEXTURE_LIBRARY[packIndex].textures[textureIndex];
      if (texture === undefined) {
        packIndex++;
        openPack();
        return;
      };
      let texturesProcess = Math.round(((textureIndex + 1) * 100) / texturePackLength);
      let packProcess = Math.round(((packIndex + 1) * 100) / packLength);

      loadingTextureScreen_showTextureProcess(texturesProcess, groupName, texture.id);
      loadingTextureScreen_showGroupProcess(packProcess, texturesProcess, globalLoadingPart);

      // console.log(`loading: ${texture.id}...`);
      switch (texture.type) {
        case 'sprite': {
          texIMG[groupName][texture.id] = new Image();
          texIMG[groupName][texture.id].src = texture.src;

          texIMG[groupName][texture.id].onload = function() {
            texIMG[groupName][texture.id].frameWidth = texIMG[groupName][texture.id].width / texture.frameAmountWidth;
            texIMG[groupName][texture.id].frameHeight = texIMG[groupName][texture.id].height / texture.frameAmountHeight;
            textureIndex++;
            loadTexture();
          };
        };
      };
    };
  };
};
