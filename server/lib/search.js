var providers = require('./providers'),
    cmd       = require('./commands'),
    http      = require('http');

module.exports = {
  init: function(obj) {
                                                             //obj.socket && obj.data
    cmd.socket = obj.socket;                                 //Throw socket into helper.
    http.request(providers.SickBeard.search(obj.data.search), this.parseRequest).end();
  },
  parseRequest: function(response){
    var str = '';
    response.on('data', function (chunk) { str += chunk; });
    response.on('end', function () {
      cmd.returnSocketData(str);
    });
    
  }
}
