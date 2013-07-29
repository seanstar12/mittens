module.exports = {
  socket:'',
  returnSocketData: function(data){
    //var temp = JSON.parse(data);
    this.socket.emit('returnSearch',data);
  },
  parseRequest: function(response, parse){
    var str = '';
    response.on('data', function (chunk) { str += chunk; });
    response.on('end', function () {
      parse(str);
    });
  }
}
