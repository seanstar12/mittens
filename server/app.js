//Search for the things
//get > /movie/?q=this -> {movies: {}}
//get > /tv/?q=this    -> {tv: {}}
//List all the local things
//get > /movies         -> {movies: {LOCAL ONLY}}
//get > /tvs            -> {tv}
//Add the things
//put > movies/:id   -> added: true
//put > tvs/:id      -> result: success

var express = require('express'),
    app = require('express')(), 
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    Mittens = require('./lib/mittens'),
    apiKey = 'gK3721';

var mittens = new Mittens();
var load = mittens.loadProviders();

load.on('loaded', startApp);



function startApp(providers) {
  //mittens.initDb(); 
  app.use(express.static(__dirname + '/../client'));
  app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
  }
 
  app.start(8083);
  
  io.sockets.on('connection', function(socket){
    socket.on('addProviders', function(data){
      console.log('Attempting to add providers');
      (apiKey == data.apiKey) ? mittens.addProviders(data.providers) : console.log('Invalid API');
    });

    socket.on('rmProvider', function(data){
      console.log('Attempting to remove provider');
      (apiKey == data.apiKey) ? mittens.rmProvider(data.name) : console.log('Invalid API');
    });

    socket.on('listProviders', function (data) {
      console.log('Attempting to list providers');
      (apiKey == data.apiKey) ? mittens.listProviders() : console.log('Invalid API');
    });

  });
  
  
  app.get('/movie', function (req, res) {
    http.request(providers.CouchPotato.FIND_QUERY(req.query), function(resp){
      var str = '';
      resp.on('data', function (chunk) { str += chunk; });
      resp.on('end', function () {
        res.send(JSON.parse(str));
      });
    }).end();
  });

  app.get('/movies', function (req, res) {
    http.request(providers.CouchPotato.FIND_MANY(req.query), function(resp){
      var str = '';
      resp.on('data', function (chunk) { str += chunk; });
      resp.on('end', function () {
        res.send(JSON.parse(str));
      });
    }).end();
  });
  
};
