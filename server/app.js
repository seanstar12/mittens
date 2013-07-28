var http = require('http'),
    io = require('socket.io').listen(8080),
    config = require('./config'),
    providers = require('./providers');

providers.SickBeard.config = config.SickBeard;

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('search', function (data) {
    console.log('Search for ' + data.search);

    var sB = providers.SickBeard.search(data.search, socket);
    runQuery(sB);
  });
});

function runQuery(obj) {
    var options = {
      host: obj.data.config.host,
      port: obj.data.config.port,
      path: obj.path
    };
    
    callback = function(response) {
      var str = '';
    
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
    
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        obj.socket.emit('search', str);
      });
    }

    console.log(options);
    http.request(options, callback).end();
}
