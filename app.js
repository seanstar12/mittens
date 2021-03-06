//Providers
//get > /providers         -> returns [{},{},{}]
//get > /providers/:name   -> returns {name:'foo',host:'bar'...}
//put > /provider          -> BODY: {"name":"","host":"","port":"","api":"","alias":"","active":true}  
//                         -> returns : [{provider},{provider},{provider}] //Full list of providers
//del > /provider/:id      -> returns : {success: true, message:"Removed Provider", provider: {removed_Provider}}

var express = require('express'),
    app = require('express')(), 
    http = require('http'),
    server = http.createServer(app),
    io = require('socket.io').listen(server),
    Mittens = require('./lib/mittens');

var sid = new Mittens();

sid.on('ready', startMe);

function startMe(aData) {
  var tv = aData.tv,
      movie = aData.movie
      apiVersion = sid.getVersion().api;
 
  sid.on('refresh', function(data){
    tv = data.tv;
    movie = data.movie;
  });
  
  app.use(express.bodyParser()); 
  app.use(express.static(__dirname + '/client/public'));
  app.use(function (req, res, next) {
      res.header("X-Powered-By", "Honda VTEC®")
      res.header("X-VTEC-Status", "Kicked in, yo")
      next()
  });
  app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
  }

  app.start(8083);

  app.get('/movies', function(req, res){
    movie.send(req,res,{type:'find',term:req.query.q}); 
  });

  app.get('/movies/:id', function(req, res) {
    movie.send(req,res,{type:'find',term:req.params.id}); 
  });

  app.put('/movies/:id', function(req, res) {
    movie.send(req,res,{type:'update', term:req.params.id});
  });

  app.get('/configs', function(req, res){
    res.send(aData);
  });
  
  app.get('/providers', function(req, res){
    res.send(sid.returnProviders());
  });
  
  app.get('/providers/:id', function(req, res){
    res.send(sid.returnProvider(req.params.id));
  });
  
  app.del('/providers/:id', function(req, res){
    res.send(sid.delProvider(req.params.id));
  });
  
  app.post('/providers', function(req, res){
    if (req.body.provider)
      req.body = req.body.provider
    sid.addProvider(req.body);
    sid.on('message', function (arg) {
      if (!arg.success) res.statusCode = 504;
      res.send(arg);
    });
  });

  app.put('/settings/:provider', function(req, res) {
    res.send({provider: sid.addProvider(req.body), success: true});
  });
 
  app.get('/*', function(req,res) {
    res.sendfile(__dirname + '/client/public/index.html');
  });
  
//  io.sockets.on('connection', function(socket){
//    socket.on('addProviders', function(data){
//      console.log('Attempting to add providers');
//      mittens.addProviders(data);
//    });
//    
//    socket.on('addProvider', function(data){
//      console.log('Attempting to add provider');
//      mittens.addProvider(data);
//    });
//
//    socket.on('rmProvider', function(name){
//      console.log('Attempting to remove provider');
//      mittens.rmProvider(name);
//    });
//
//    socket.on('listProviders', function (data) {
//      console.log('Attempting to list providers');
//      mittens.listProviders();
//    });
//
//    socket.on('status', function (data) {
//      console.log(data);
//    });
//  });
};

