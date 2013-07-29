var config = require('./config'),
    cmd = require('./commands');

var providers = module.exports =  {
  SickBeard : {
    active: true,
    title: "Sick-Beard",
    alias: "Tv Shows",
    config: {},
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      var path = '/api/' + this.config.api + '/?cmd=sb.searchtvdb&lang=en&name=' + safeQuery;
      
      var options = {
        host: this.config.host,
        port: this.config.port,
        path: path,
      }
      
      return options;
    },
    searchCB: function(data){
      
    }
  },
  CouchPotato : {
    active: false,
    title: "CouchPotato",
    alias: "Movies",
    config: {},
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      var path =  '/api/' + this.config.api + 
                  '/movie.search/?callback_func=cmd.parseRequest&q=' + safeQuery;
      var options = {
        host: this.config.host,
        port: this.config.port,
        path: path,
      }
      return options;
    },
    searchCB: function(data){
    }
  }
}

providers.SickBeard.config = config.SickBeard;
providers.CouchPotato.config = config.CouchPotato;
