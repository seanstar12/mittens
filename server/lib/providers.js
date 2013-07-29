var config = require('./config'),
    cmd = require('./commands');

var providers = module.exports =  {
  SickBeard : {
    active: true,
    title: "Sick-Beard",
    alias: "Tv Shows",
    config: {},
    retrieveSearchData: function(response){
      cmd.parseRequest(response, providers.SickBeard.parse);
    },
    parse: function(data){
      cmd.returnSocketData({'TV Shows':JSON.parse(data).data.results});
    },
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      var path = '/api/' + this.config.api + '/?cmd=sb.searchtvdb&lang=en&name=' + safeQuery;
      
      return {
        host: this.config.host,
        port: this.config.port,
        path: path,
      }
      
    },
    listShow: function(id){
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/'+ this.config.api + '/?cmd=show|show.seasons&tvdbid='+id
      }
    }
  },
  CouchPotato : {
    active: true,
    title: "CouchPotato",
    alias: "Movies",
    config: {},
    retrieveSearchData: function(response){
      cmd.parseRequest(response, providers.CouchPotato.parse);
    },
    parse: function(data){
      cmd.returnSocketData({'Movies':JSON.parse(data).movies});
    },
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      var path =  '/api/' + this.config.api + '/movie.search/?q=' + safeQuery;
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
