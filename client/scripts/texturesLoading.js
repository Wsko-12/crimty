async function LOAD_TEXTURES() {
  for (let group in TEXTURE_LIBRARY) {
    texIMG[group] = {};
    arrLength = TEXTURE_LIBRARY[group].length;
    let i = 0;


    for await (let texture of TEXTURE_LIBRARY[group]) {
      i++;
      let process = (i * 100) / arrLength);
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


return true;
};
