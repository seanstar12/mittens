var providers = require('./providers'),
    cmd       = require('./commands'),
    cmd       = require('./search'),
    http      = require('http');

module.exports = {
  init: function(obj) {                                      //obj.socket && obj.query && obj.provider
    //cmd.socket  = this.socket;                                 //Throw socket into helper.
    //obj.socket.emit('progress','Sending Search Request For: '+this.title);
    //console.log(obj);
    http.request(obj.provider.search(obj.query), obj.provider.retrieveSearchData).end();
    
//    jQuery.each(providers, function(i, el){
//      if (this.active && typeof this != 'function'){
//        obj.socket.emit('progress','Sending Search Request For: '+el.title);
//        http.request(this.search(obj.data.search), this.retrieveSearchData).end();
//      }
//    });
  }
}
