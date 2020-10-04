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

  namesElemt.innerHTML = `${group}:${texture}`;
  processElement.style.width = `${procents}%`;
};
let loadingTextureScreen_showGroupProcess = function(procents) {
  let element = document.getElementById('loadingTextureScreen_GroupProcess');
  element.innerHTML = `${procents}%`;
};






async function LOAD_TEXTURES() {
  loadingTextureScreenSwitch(true);
  let groupsLength = Object.keys(TEXTURE_LIBRARY).length;
  let groupElement = 0;

  for (let group in TEXTURE_LIBRARY) {
    groupElement++;
    let groupProcess = Math.round((groupElement * 100) / groupsLength);
    loadingTextureScreen_showGroupProcess(groupProcess);



    texIMG[group] = {};
    textureLength = TEXTURE_LIBRARY[group].length;
    let textureElement = 0;



    for await (let texture of TEXTURE_LIBRARY[group]) {
      textureElement++;
      let textureProcess = Math.round((textureElement * 100) / textureLength);
      loadingTextureScreen_showTextureProcess(textureProcess, group, texture.id)

      switch (texture.type) {
        case 'sprite':
          texIMG[group][texture.id] = new Image();
          texIMG[group][texture.id].src = texture.src;

          texIMG[group][texture.id].onload = function() {
            texIMG[group][texture.id].frameWidth = texIMG[group][texture.id].width / texture.frameAmountWidth;
            texIMG[group][texture.id].frameHeight = texIMG[group][texture.id].height / texture.frameAmountHeight;
          };

          break;



        case 'asdasd':
          break;
        default:

      };

    };
  };
  //
  // loadingTextureScreenSwitch(false);
  return true;
};
