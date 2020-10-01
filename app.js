const express = require('express');
const app = express();
const http = require('http').createServer(app);
const DB = require('./my_modules/database.js');

DB.connectDb();
 console.log('db connected')


http.listen(3000,()=> {console.log( 'Server started');});

app.get ( '/' , (req, res) => {
    res.sendFile (__dirname + '/client/index.html');
});

app.use('/client',express.static(__dirname + '/client'));


const io = require('socket.io')(http);





io.sockets.on('connection', function(socket){
    console.log(`socket connected: ${socket.id}`);

    socket.on('disconnect',function(){
      console.log(`socket disconnected: ${socket.id}`);
    });
});
