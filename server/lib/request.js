var providers = require('./providers'),
    http = require('http');

var request = {
  init: function(obj){
    this.socket = obj.socket;
    this.data = obj.data;
    this.source = obj.source;
    this.action = obj.data.action;
    this.uuid = obj.uuid;
    this.provider = providers.getProvider(this.data.type);
    
    console.log('Http Request being built');
    http.request(this.provider[this.data.action](this.data.query.search),
                 this.parseResponse).end();               

  },

  // Keeping this here allows context so we can use request.bleh
  parseResponse: function(resp){
    var str = '';
    resp.on('data', function (chunk) { str += chunk; });
    resp.on('end', function () {
      request.socket.emit(request.source, {
        uuid: request.data.uuid,
        data: request.provider.formatData(str)
      })
    });
    
  }
}

module.exports = request;
