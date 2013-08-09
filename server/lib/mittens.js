var CouchPotato = require('./couchpotato'),
    SickBeard   = require('./sickbeard'), 
    fs = require('fs'),
    ProviderObjects =  { 
      movie: new CouchPotato(), 
      tv: new SickBeard()
    },
    dbHelper = require('./dbHelper'),
    events = require('events');

module.exports = Mittens;

function Mittens() {
  events.EventEmitter.call(this);
  console.log('Mittens: ' + this.getVersion());
}

Mittens.super_ = events.EventEmitter;
Mittens.prototype = Object.create(events.EventEmitter.prototype, {
  constructor: {
    value: Mittens,
    enumerable: false
  }
});

Mittens.prototype.getVersion = function () {
  return JSON.parse(fs.readFileSync("" + __dirname + "/../package.json", 'utf8')).version;
}

Mittens.prototype.load = function () {
  var self = this;
  
  self.func = function(cb){
    dbHelper.loadConfig(cb);
  };

  self.func(function(data) {
    self.emit('loaded', data);
  });

  return self;
}

Mittens.prototype.build = function (conf) {
  var providers = {};
  
  for ( var i=0; i != conf.length; i++)
    providers[conf[i].alias] = conf[i];

  for ( var item in providers )
    if (providers[item].active) {
      var provConf = providers[item];
      ProviderObjects[item].init(provConf);
    }

  return ProviderObjects;
}

Mittens.prototype.addProviders = function (arryProviders) {
  dbHelper.addProviders(arryProviders);
}

Mittens.prototype.addProvider = function (conf) {
  dbHelper.addProvider(providers, conf);
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











