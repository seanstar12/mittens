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
      movie = aData.movie;

  app.use(express.bodyParser()); 
  app.use(express.static(__dirname + '/../client'));
  app.start = app.listen = function(){
    return server.listen.apply(server, arguments)
  }
  app.start(8083);
  
  
  app.get('/movies', function(req, res){
    movie.send(req,res,{type:'find',term:req.query.q}); 
  });

  app.get('/cptest', function(req, res){
    movie.send(req,res,{type:'test'}); 
  });
  
  app.get('/movies/:id', function(req, res) {
    movie.send(req,res,{type:'find',term:req.params.id}); 
  });

  app.put('/movies/:id', function(req, res) {
    movie.send(req,res,{type:'update', term:req.params.id});
  });

  app.get('/settings', function(req, res){
    res.send(aData);
  });
  
  app.get('/providers', function(req, res){
    res.send(sid.returnProviders());
  });
  
  app.get('/providers/:name', function(req, res){
    res.send(sid.returnProvider(req.params.name));
  });
  
  app.del('/provider/:id', function(req, res){
    res.send(sid.delProvider(req.params.id));
  });
  
  app.put('/provider', function(req, res){
    res.send(sid.addProvider(req.body));
  });

  app.put('/settings/:provider', function(req, res) {
    res.send({provider: sid.addProvider(req.body), success: true});
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

