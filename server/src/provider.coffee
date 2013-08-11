{Base} = require './base'
http = require 'http'

class Provider extends Base
  constructor: (obj = {}) ->
    @name = obj.name ? 'None'
    @host = obj.host ? '127.0.0.1'
    @port = obj.port ? '8080'
    @api  = obj.api  ? 'I<3U'
    @active = obj.active ? true
    @alias = obj.alias ? 'none'

    @on 'log', -> console.log 'LOG: ' + x for x in arguments
    @on 'err', -> console.log 'ERR: ' + x for x in arguments
    @on 'status', -> 
      console.log 'STA: ' + x for x in arguments
  
  send: (req, res, q) ->
    query = @buildReturn(q.type, q.term)
    _this = this   
  
    http.request( query, (resp) ->
      str = '' 
      bit = 0
      
      resp.on('data', (chunk) ->
        bit++
        str += chunk
      );
      resp.on('end', () -> 
        _this.emit 'status', _this.name + ': ' + bit + ' chunks received.'
        res.send(JSON.parse(str))
      );
    
    ).end();
  
  buildReturn: (ref, q) ->
    @emit 'log', @url[ref].log

    term = encodeURIComponent(q ? '')
    actionPath = @url[ref].str

    return {
      host: @host
      port: @port
      path: '/api/' + @api + '/' + actionPath + term
    } 

module.exports = 

  generic: Provider

  CouchPotato: class CouchPotato extends Provider

    url: {
      test: {str: 'app.available', log: @name + ': Checking to see if app is available'},
      find: {str: 'movie.search/?q=', log: @name + ': Find'},
      update: {str: 'movie.add/?identifier='},
      add: {str: 'movie.add/?identifier='}
    }
  
    move: ->
      console.log 'hay'
      console.log this

  SickBeard: class SickBeard extends Provider

    url: {
      test: {str: 'app.available'},
      find: {str: 'movie.search/?q='},
      update: {str: 'movie.add/?identifier='},
      add: {str: 'movie.add/?identifier='}
    }
    
    move: ->
      console.log 'hello'
      console.log this
    
