var http = require('http'),
    io = require('socket.io').listen(8080),
    search = require('./lib/search'),
    emberData = require('./lib/emberData');

// change log level in socket.io to not show debug messages
io.set('log level', 2);

io.sockets.on('connection', function (socket) {
  socket.on('search', function (data) {
    console.log(data);
    search.init({socket: socket, data: data});
  });
  socket.on('ember-data',function (data) {
    console.log(data);
    var reqData = new emberData({data:data, socket:socket});

    reqData.processAction();
    //socket.emit('ember-data', { uuid: data.uuid, data: { movies: [{original_title: 'test', year: '2013' }]}});
    //socket.emit('ember-data', { uuid: data.uuid, data: { movie: [{original_title: 'Backdoor Sluts 9', year: '2003' }]}});
  });
});
