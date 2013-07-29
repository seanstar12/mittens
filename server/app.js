var http = require('http'),
    io = require('socket.io').listen(8080),
    search = require('./lib/search'),
    cmd = require('./lib/commands');

io.sockets.on('connection', function (socket) {
  socket.on('search', function (data) {
    search.init({socket: socket, data: data});
  });
});
