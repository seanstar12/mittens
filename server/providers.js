var providers = module.exports =  {
  SickBeard : {
    title: "Sick-Beard",
    alias: "Tv Shows",
    config: {},
    search: function(query, socket) {
      var path = '/api/' + this.config.api + '/?cmd=sb.searchtvdb&lang=en&name=' + encodeURIComponent(query);
      return {path:path, data:this, socket:socket};
    }
  }
  
}
