function Provider() {}

Provider.prototype.init = function(obj) {
  this.name  = obj.name;
  this.host  = obj.host;
  this.port  = obj.port;
  this.api   = obj.api;
  this.active = obj.active;
}

Provider.prototype.buildReturn = function(ref, q) {
  var term = encodeURIComponent(q);
   
  return {
    host: this.host,
    port: this.port,  
    path: '/api/' + this.api + '/' + this.url[ref].str + term
  }
}

Provider.prototype.chunk = function(resp, res){
  var str = '';
  resp.on('data', function (chunk) { str += chunk; });
  resp.on('end', function () {
    res.send(JSON.parse(str));
  });
}

module.exports = Provider;

