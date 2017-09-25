let express = require('express');
let socket = require('socket.io');

// App setup 

let app = express();
let server = app.listen(4000, function() {
    console.log('listening to requests on port 4000');
});

// static file


//socket setup
let io = socket(server);

io.on('connection',function(socket) {
    // console.log('made socket connection', socket.id); // get connection id
    // console.log("Query: ", socket.handshake.query);
    // console.log(Object.keys(io.sockets.connected).length);  // connection count

    socket.on('drawing', function(data) {
        socket.broadcast.emit('drawing', data);

    });

    socket.on('sendBroadcastMsg', function(data) {
        // console.log('receive');
        io.sockets.emit('broadCMsg', data);

    });
    

    socket.on('welcomeMsg', function(data) {
        
        let currentLive =  Object.keys(io.sockets.connected).length// connection count
        var data = {
            socketName: data.socketName,
            currentLive: currentLive,
        }
        io.sockets.emit('welcomeMsg', data);
        
    });
})