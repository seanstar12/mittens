module.exports = {
  socket:'',
  returnSocketData: function(data){
    this.socket.emit('returnSearch',data);
  }
}
