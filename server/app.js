var http = require('http'),
    io = require('socket.io').listen(8080),
    config = require('./config');

io.sockets.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('search', function (data) {
    console.log('Search for ' + data.search);

    SickBeard.search(data.search, socket);
  });
});

var SickBeard = {
  title: "Sick-Beard",
  alias: "Tv Shows",
  host: config.sickbeard.host,
  port: config.sickbeard.port,
  api: config.sickbeard.api,
  search: function(query, socket) {
    var path = '/api/' + this.api + '/?cmd=sb.searchtvdb&lang=en&name=' + query;
    runQuery(path, this, socket);
  },
}

function runQuery(path, obj, socket) {

    var options = {
      host: obj.host,
      port: obj.port,
      path: path,
    };
    
    callback = function(response) {
      var str = '';
    
      //another chunk of data has been recieved, so append it to `str`
      response.on('data', function (chunk) {
        str += chunk;
      });
    
      //the whole response has been recieved, so we just print it out here
      response.on('end', function () {
        socket.emit('search', str);
      });
    }

    console.log(options);
    http.request(options, callback).end();
}
