const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://crimty:5c9r9i1m2t1y21@crimtycluster.ltqku.mongodb.net/<dbname>?retryWrites=true&w=majority";


module.exports.connectDb = async function connnect(){
    client = await MongoClient.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true }).catch(err => { console.log(err); });

    if (!client) {
        return;
    }
};
