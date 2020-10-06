const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://crimty:5c9r9i1m2t1y21@crimtycluster.ltqku.mongodb.net/<dbname>?retryWrites=true&w=majority";

function generateId(type, x) {
  let letters = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnPpQqRrSsTtUuVvWwXxYyZz';

  let numbers = '0123456789';
  let lettersMix, numbersMix;
  for (i = 0; i < 10; i++) {
    lettersMix += letters;
    numbersMix += numbers;
  }

  let mainArr = lettersMix.split('').concat(numbersMix.split(''));
  let shuffledArr = mainArr.sort(function() {
    return Math.random() - 0.5;
  });
  let id = type + '_';
  for (let i = 0; i <= x; i++) {
    id += shuffledArr[i];

  };
  return id;
};
let arrayToObjectBy = function(key, arr) {
  let obj = {};
  arr.forEach((item) => {
    obj[item[key]] = item;
  });
  return obj;
};

let client;

module.exports.connectDb = async function connnect() {
  client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }).catch(err => {
    console.log(err);
  });

  if (!client) {
    return;
  }
};

let findLogin = async function findOne(login) {
  if (!client) {
    return;
  };
  try {
    const db = client.db("crimtyApp");
    let collection = db.collection('users');
    let query = {
      login: login
    }
    let result = await collection.findOne(query);
    return result;
  } catch (err) {
    console.log(err);
  };
};



let registOne = async function registOne(login, password) {
  if (!client) {
    return;
  };
  try {
    const db = client.db("crimtyApp");
    let collection = db.collection('users');
    let query = {
      id: generateId('user', 7),
      login: login,
      password: password,
    }
    let result = await collection.insertOne(query);
    return result.ops[0];
  } catch (err) {
    console.log(err);
  };
};



let findAllRooms = async function findRooms() {
  if (!client) {
    return;
  };
  try {
    const db = client.db("crimtyApp");
    let collection = db.collection('rooms');

    let result = await collection.find().toArray();
    result.forEach((item) => {
      delete item._id;
    });

    result = arrayToObjectBy('id', result);
    return result;
  } catch (err) {
    console.log(err);
  };
};

let loadTexturePack = async function findAllTextures() {
  if (!client) {
    return;
  };
  try {
    const db = client.db("crimtyApp");
    let collection = db.collection('textures');
    let result = await collection.find().toArray();
    return result;
  } catch (err) {
    console.log(err);
  };
};


module.exports.findLogin = findLogin;
module.exports.registOne = registOne;
module.exports.findAllRooms = findAllRooms;
module.exports.loadTexturePack = loadTexturePack;
