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



module.exports.findLogin = findLogin;
module.exports.registOne = registOne;
