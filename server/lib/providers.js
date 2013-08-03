var config = require('./config');

var providers =  {
  SickBeard : {
    active: true,
    title: "Sick-Beard",
    alias: "Tv Shows",
    sort: "show",
    config: {},
    FIND_QUERY: function(query) {
      console.log('SickBeard.FIND_QUERY: '+ query.search);
      var safeQuery = encodeURIComponent(query.search);
      
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/' + this.config.api + '/?cmd=sb.searchtvdb&lang=en&name=' + safeQuery
      }
    },
    UPDATE: function(query){
      console.log('SickBeard.UPDATE: '+ query.tvbid);
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/'+ this.config.api + '/?cmd=addnew&tvdbid='+query.tvbid
      }
    },
    listShow: function(id){
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/'+ this.config.api + '/?cmd=show|show.seasons&tvdbid='+id
      }
    },
    formatData: function(str){
      console.log('SickBeard.formatData()');
      return {tvshows: JSON.parse(str).results}
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
     
      return {
        host: this.config.host,
        port: this.config.port,
        path: path
      }
    },
    //Using update so we don't have to mess with socket plugin settings.
    UPDATE: function(query){
      console.log('CouchPotato.UPDATE: '+ query.imdb);
      
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api/' + this.config.api + '/movie.add/?identifier=' + query.imdb
      }
    },
    FIND_MANY: function(query){
      // Find from couchpotato manager
      console.log('CouchPotato.FIND_MANY: ');
      var path = '/api/' + this.config.api + '/movie.list/?';
      
      if (query.status) path += 'status='+query.status;
      if (query.search) path += '&search='+encodeURIComponent(query.search);

      return {
        host: this.config.host,
        port: this.config.port,
        path: path
      }
    }, 
    formatData: function(str){
      console.log('CouchPotato.formatData()');
      var returnData = JSON.parse(str);
      
      if (returnData.added) {
        return returnData;  // catches success /fail message for adding movies
      } else { 
        return {movies: JSON.parse(str).movies};
      }
    }
  },
  SABnzbd: {
    active: true,
    title: "SABnzbd",
    alias: "NZBs",
    sort: "nzb",
    FIND_ALL: function(){
      console.log('SABnzbd.FIND_ALL');
      return {
        host: this.config.host,
        port: this.config.port,
        path: '/api?apikey=' + this.config.api + '&output=json&mode=qstatus'
      }
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
providers.SABnzbd.config = config.SABnzbd;

module.exports = providers;
