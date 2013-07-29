module.exports = {
  socket:'',
  uuid: '',
  returnSocketData: function(data){
    //var temp = JSON.parse(data);
    data.uuid = this.uuid;
    this.socket.emit('ember-data',data);
  },
  parseRequest: function(response, parse){
    var str = '';
    response.on('data', function (chunk) { str += chunk; });
    response.on('end', function () {
      parse(str);
    });
  }
}
