var express = require('express')

// App setup
var app = express()
var server = require('http').Server(app)
var socket = require('socket.io')


// Static files
app.use(express.static('public'));

// Socket setup
var io = socket(server);

io.on('connection', function(socket) {
    socket.on('current_location', function(data){
        io.sockets.emit('current_location', data);
    });
})
server.listen(process.env.PORT||4000)