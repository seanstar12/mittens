var config = require('./config'),
    http   = require('http'),
    jQuery = require('jquery'),
    cmd = require('./commands');

var providers =  {
  SickBeard : {
    active: true,
    title: "Sick-Beard",
    alias: "Tv Shows",
    sort: "show",
    config: {},
    retrieveSearchData: function(response){
      cmd.socket.emit('progress','Retrieveing Search Data: '+providers.SickBeard.title);
      cmd.parseRequest(response, providers.SickBeard.parse);
    },
    parse: function(data){
      cmd.socket.emit('progress','Parsing Search Data: '+providers.SickBeard.title);
      cmd.returnSocketData({'TV Shows':JSON.parse(data).data.results});
    },
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/' + this.config.api + '/?cmd=sb.searchtvdb&lang=en&name=' + safeQuery
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
    sort: "movie",
    config: {},
    retrieveSearchData: function(response){
      //cmd.socket.emit('progress','Retrieveing Search Data: '+providers.CouchPotato.title);
      cmd.parseRequest(response, providers.CouchPotato.parse);
    },
    parse: function(data){
      //cmd.socket.emit('progress','Parsing Search Data: '+providers.CouchPotato.title);
      cmd.returnSocketData({'data':{'movies':JSON.parse(data).movies}});
    },
    search: function(query) {
      var safeQuery = encodeURIComponent(query);
      var path =  '/api/' + this.config.api + '/movie.search/?q=' + safeQuery;
      return {
        host: this.config.host,
        port: this.config.port,
        path: path,
      }
    }
  },
  getProvider: function(type){
    console.log('Find Provider For: ' + type);
    var ret = '';
    jQuery.each(providers, function(i,el){
      if (typeof el !== 'function' && type == el.sort){
        ret = el;
        return true; 
      }
    }); 
    return ret;
  }
}

providers.SickBeard.config = config.SickBeard;
providers.CouchPotato.config = config.CouchPotato;

module.exports = providers;
