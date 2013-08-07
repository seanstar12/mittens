//Search for the things
//get > /movies/?q=this -> {movies: {}}
//get > /tvs/?q=this    -> {tv: {}}
//List all the local things
//get > /movie        -> {movies: {LOCAL ONLY}}
//get > /tv            -> {tv}
//Add the things
//put > movies/:id   -> added: true
//put > tvs/:id      -> result: success

var express = require('express'),
    app = require('express')(), 
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    Mittens = require('./lib/mittens'),
    provider = require('./lib/provider'),
    CouchPotato = require('./lib/couchpotato');



var mittens = new Mittens();
var load = mittens.load();
var providerList = {};


load.on('loaded', startApp);

function startApp(providers) {
  //mittens.initDb();
  app.use(express.static(__dirname + '/../client'));
  app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
  }
  app.start(8083);
  
  var cp = new CouchPotato();
  cp.init(providers[0]); 
  
  io.sockets.on('connection', function(socket){
    socket.on('addProviders', function(data){
      console.log('Attempting to add providers');
      mittens.addProviders(data);
    });
    
    socket.on('addProvider', function(data){
      console.log('Attempting to add provider');
      mittens.addProvider(data);
    });

    socket.on('rmProvider', function(name){
      console.log('Attempting to remove provider');
      mittens.rmProvider(name);
    });

    socket.on('listProviders', function (data) {
      console.log('Attempting to list providers');
      mittens.listProviders();
    });

  });
  
  
  app.get('/movies', function (req, res) {
    http.request(cp.buildReturn('find',req.query.q), function(resp){
      cp.chunk(resp, res);
    }).end();
  });
 
 
  app.get('/movies/:id', function(req, res) {
    http.request(cp.buildReturn('find',req.params.id), function(resp){
      cp.chunk(resp, res);
    }).end();
  });

  app.put('/movies/:id', function(req, res) {
    console.log(req.params.id);
    http.request(cp.buildReturn('update',req.params.id), function(resp){
      cp.chunk(resp, res);
    }).end();
  });

//
//  app.get('/movie', function (req, res) {
//    http.request(providers.CouchPotato.FIND_MANY(req.query), function(resp){
//      var str = '';
//      resp.on('data', function (chunk) { str += chunk; });
//      resp.on('end', function () {
//        res.send(JSON.parse(str));
//      });
//    }).end();
//  });
  
};
