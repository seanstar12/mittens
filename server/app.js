var http = require('http'),
    io = require('socket.io').listen(8080),
    Request = require('./lib/request');

io.sockets.on('connection', function (socket) {
  socket.on('search', function (data) {
    console.log({'data':data, 'socket':socket, source:'search'});
  });
  socket.on('ember-data',function (data) {
    console.log(data);
    var req = Request.init({data:data, socket:socket, source:'ember-data'});
  });
});
