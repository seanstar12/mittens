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
    @on 'err', -> 
      console.log 'ERR: ' + x for x in arguments
    @on 'status', -> 
      console.log 'STA: ' + x for x in arguments
  
  send: (req, res, q) ->
    query = @buildReturn(q.type, q.term)
    _response = ''
    _this = this   
  
    timeout_wrapper = (Request) ->
      return () ->
        _this.emit 'err', 'Page Timed out'
    
    _request = http.request( query, (resp) ->
      str = '' 
      bit = 0
      
      resp.on('data', (chunk) ->
        bit++
        str += chunk
      )
      resp.on('end', () ->
        clearTimeout( timeout ); 
        
        obj = ''
        _this.emit 'status', _this.name + ': ' + bit + ' chunks received.'
        if (str)
          try
            res.send(JSON.parse(str)).end()
          catch e
            res.statusCode = 503
            res.send({"response": str}).end()
      )
    ).on('error', (err) ->
      clearTimeout( timeout ); 
      _this.emit 'err', err.errno
      res.statusCode = 504
      res.send({"success":false, "error":err.errno, "statusCode":504}).end()
    ).end()

    fn = timeout_wrapper _request
    timeout = setTimeout fn, 3000 

  test: (fn) ->
    timeout_wrapper = (Request) ->
      return () ->
        fn {'success':false, 'message': 'Page Timed out'}
    
    _this = this
    query = @buildReturn('test', '')
    
    _req = http.get( query, (resp) ->
      str = '' 
      
      resp.on('data', (chunk) ->
        str += chunk
      )
      resp.on('end', () ->
        obj = {}
        try
          obj = JSON.parse(str)
        catch e
          obj = {"response": str}
        fn obj
      )
    ).on('error', (err) ->
      fn {"success": false, "status":err.code}
    ).end()

    func = timeout_wrapper _req
    timeout = setTimeout func, 3000 
  
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
  
  SickBeard: class SickBeard extends Provider

    url: {
      test: {str: 'app.available'},
      find: {str: 'movie.search/?q='},
      update: {str: 'movie.add/?identifier='},
      add: {str: 'movie.add/?identifier='}
    }
    
