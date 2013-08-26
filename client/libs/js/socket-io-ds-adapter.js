/*jshint browser:true */
/*global DS:true, io:true, App:true */

(function() {
  'use strict';

  // Initializer for Models
  window.Models = {};
  console.warn("Don't pollute the global namespace with Models!");

  var SOCKET = '/'; // Served off the root of our app
  
  var TYPES = {
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

  DS.SocketAdapter = DS.RESTAdapter.extend({
  
    socket: undefined,
  
    /*
    * A hashmap of individual requests. Key/value pairs of a UUID
    * and a hashmap with the parameters passed in based on the 
    * request type. Includes "requestType" and "callback" in addition.
    * RequestType is simply an enum value from TYPES (Defined below)
    * and callback is a function that takes two parameters: request and response.
    * the `ws.on('ember-data`) method receives a hashmap with two keys: UUID and data.
    * The UUID is used to fetch the original request from this.requests, and that request
    * is passed into the request's callback with the original request as well.
    * Finally, the request payload is removed from the requests hashmap.
    */
    requests: undefined,
    
    generateUuid: function() {
      var S4 = function (){
        return Math.floor(
          Math.random() * 0x10000 // 65536
        ).toString(16);
      };

      return (
        S4() + S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + "-" +
        S4() + S4() + S4()
      );
    },
    
    send: function(request) {
      request.uuid = this.generateUuid();
      request.context = this;
      
      var requests = this.get('requests');

      requests[request.uuid] = request;

      this.set('requests', requests);

      var data = {
        uuid: request.uuid,
        action: request.requestType,
        type: this.rootForType(request.type)
      };

      if (request.query !== undefined) {
        data.query = request.query;
      }

      if (request.id !== undefined) {
        data.id = request.id;
      }
      
      if (request.record !== undefined) {
        data.record = this.serialize(request.record, { includeId: true});
      }
      
      this.socket.emit('ember-data', data);
    },
    
    find: function (store, type, id) {
      this.send({
        store: store,
        type: type,
        id: id,
        requestType: TYPES.FIND,
        callback: function(req, res) {
          Ember.run(req.context, function(){
            this.didFindRecord(req.store, req.type, res, req.id);
          });
        }
      });
    },
    
    findMany: function (store, type, ids, query) {
      // ids = this.serializeIds(ids);
      
      this.send({
        store: store,
        type: type,
        ids: ids,
        query: query,
        requestType: TYPES.FIND_MANY,
        callback: function(req, res) {
          Ember.run(req.context, function(){
            this.didFindMany(req.store, req.type, res);
          });
        }
      });
    },
    
    findQuery: function(store, type, query, recordArray) {
      this.send({
        store: store,
        type: type,
        query: query,
        recordArray: recordArray,
        requestType: TYPES.FIND_QUERY,
        callback: function(req, res) {
          Ember.run(req.context, function(){
            this.didFindQuery(req.store, req.type, res, req.recordArray);
          });
        }
      });
    },
    
    findAll: function(store, type, since) {
      this.send({
        store: store,
        type: type,
        since: this.sinceQuery(since),
        requestType: TYPES.FIND_ALL,
        callback: function(req, res) {
          Ember.run(req.context, function(){
            this.didFindAll(req.store, req.type, res);
          });
        }
      });
    },
    
    createRecord: function(store, type, record) {
      this.send({
        store: store,
        type: type,
        record: record,
        requestType: TYPES.CREATE,
        callback: function(req, res) {
          Ember.run(req.context, function(){
            this.didCreateRecord(req.store, req.type, req.record, res);
          });
        }
      });
    },
    
    createRecords: function(store, type, records) {
      return this._super(store, type, records);
    },
  
    updateRecord: function(store, type, record) {
      this.send({
        store: store,
        type: type,
        record: record,
        requestType: TYPES.UPDATE,
        callback: function(req, res) {
          Ember.run(req.context, function() {
            this.didSaveRecord(req.store, req.type, req.record, res);
          });
        }
      });
    },
  
    updateRecords: function(store, type, records) {
      return this._super(store, type, records);
    },
  
    deleteRecord: function(store, type, record) {
      this.send({
        store: store,
        type: type,
        record: record,
        requestType: TYPES.DELETE,
        callback: function(req, res) {
          Ember.run(req.context, function() {
            this.didSaveRecord(req.store, req.type, req.record, res);
          });
        }
      });
    },
  
    deleteRecords: function(store, type, records) {
      return this._super(store, type, records);
    },
    
    
    init: function () {
      
      this._super();
      
      var context = this;
      
      this.set('requests', {});
      
      //var ws = io.connect('//' + '10.0.1.8:8080');
      var ws = io.connect('//' + location.host + ':8099');
      
      // For all standard socket.io client events, see https://github.com/LearnBoost/socket.io-client
      
      /*
      * Returned payload has the following key/value pairs:
      * {
      *   uuid: [UUID from above],
      *   data: [payload response],
      * }
      */
      ws.on('ember-data', function(payload) {
        var uuid = payload.uuid;
        var request = context.get('requests')[uuid];

        request.callback(request, payload.data);
        
        // Cleanup
        context.get('requests')[uuid] = undefined;
      });
      
      ws.on('disconnect',function () {
      
      });
      
      this.set('socket', ws);
    }
    
  });
  
  // Convenience method for handling saves of state via the model.
    DS.Model.reopen({
      save:function() {
        App.store.commit();
        return this;
      }
    });
}());
