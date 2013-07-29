var providers = require('./providers'),
    cmd       = require('./commands'),
    http      = require('http'),
    jQuery    = require('jquery');

module.exports = {
  init: function(obj) {                                      //obj.socket && obj.data
    cmd.socket = obj.socket;                                 //Throw socket into helper.
    
    jQuery.each(providers, function(){
      if (this.active)
        http.request(this.search(obj.data.search), this.retrieveSearchData).end();
    });
  }
}
