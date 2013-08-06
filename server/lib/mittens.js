var providers = require('./providers'),
    dbHelper = require('./dbHelper'),
    events = require('events');


module.exports = Mittens;

function Mittens() {
  events.EventEmitter.call(this);
}

Mittens.super_ = events.EventEmitter;
Mittens.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Mittens,
    enumerable: false
  }
});


Mittens.prototype.loadProviders = function () {
  var self = this;
  
  self.load = function(cb){
    dbHelper.loadConfig(providers, cb);
  };

  self.load(function(data) {
    self.emit('loaded', data);
  });

  return self;
}

Mittens.prototype.addProviders = function (arryProviders) {
  dbHelper.addProviders(arryProviders);
}

Mittens.prototype.rmProvider = function (name) {
  dbHelper.rmProvider(name);
}

Mittens.prototype.listProviders = function () {
  dbHelper.listProviders();
}

Mittens.prototype.closeDb = function () {
  dbHelper.closeDb();
}
Mittens.prototype.initDb = function () {
  dbHelper.initDb();
}











