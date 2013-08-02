var config = require('./config');

var providers =  {
  SickBeard : {
    active: true,
    title: "Sick-Beard",
    alias: "Tv Shows",
    sort: "show",
    config: {},
    FIND_QUERY: function(query) {
      var safeQuery = encodeURIComponent(query.search);
      
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
    FIND_QUERY: function(query){
      console.log('CouchPotato.FIND_QUERY: '+ query.search);
      var safeQuery = encodeURIComponent(query.search),
          path =  '/api/' + this.config.api + '/movie.search/?q=' + safeQuery;
     
      console.log(path); 
      return {
        host: this.config.host,
        port: this.config.port,
        path: path
      }
      
    },
    CREATE: function(obj){
      console.log('CouchPotato.CREATE: '+ query.imdb);
      var    path =  '/api/' + this.config.api + '/movie.add/?identifier=' + query.imdb;
      
      return {
        host: this.config.host,
        port: this.config.port,
        path: path
      }
      
    },
    formatData: function(str){
      console.log('CouchPotato.formatData(listOfMovies)');
      return {movies: JSON.parse(str).movies}
    }
  },
  getProvider: function(type){
    console.log('Finding Provider For: ' + type);
    for (var key in providers) {
      if (type == providers[key].sort){
        console.log('Found Provider \"' + key + '\" for ' + type);  
        return providers[key];
      }
    } 
  }
}

providers.SickBeard.config = config.SickBeard;
providers.CouchPotato.config = config.CouchPotato;

module.exports = providers;
