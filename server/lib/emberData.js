var providers = require('./providers'),
    search = require('./search'),
    cmd = require('./commands');

function emberData(data) {
  cmd.uuid = data.data.uuid;
  this.action = data.data.action;
  this.type = data.data.type;
  this.id   = data.data.id || null;
  this.query = (data.data.query) ? data.data.query.search : null;
  cmd.socket = data.socket;
  this.types = {
    CREATE: "CREATE",
    CREATES: "CREATES",
    UPDATE: "UPDATE",
    UPDATES: "UPDATES",
    DELETE: "DELETE",
    DELETES: "DELETES",
    FIND: "FIND",
    FIND_MANY: "FIND_MANY",
    FIND_QUERY: "FIND_QUERY",
    FIND_ALL: "FIND_ALL"
   };
}

emberData.prototype.processAction = function(socket){
  console.log('EmberDataHelper: Action > '+ this.action);
  switch (this.action) {
    case this.types.FIND_ALL:
      console.log('Find All The Things!');
      //providers.getProvider(this.type);
      break; 
    case this.types.FIND:
      console.log('Find One Of The Things!');
      providers.getProvider(this.type);
      break; 
    case this.types.FIND_QUERY:
      console.log('Find Query: '+ this.query);
      search.init({socket:this.socket,query:this.query,provider:providers.getProvider(this.type)});
      break; 
  }

}

module.exports = emberData;
