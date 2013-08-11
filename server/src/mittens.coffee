fs = require 'fs'
{Base} = require './base'
prov = require './provider'

class Mittens extends Base
  constructor: (@options = {}) ->
    @name ?= 'Mittens'
    @ver  ?=  do @getVersion
    @config = []
    @providers = {}
    @on 'log', -> console.log x for x in arguments    
    do @init

    return @

  init: ->
    do @readConfig
    @on 'stage', ->
      do @createProviderObj
  
  findAliases:  ->
    aliases = {}
    for provider in @config
      aliases[provider.alias] = ''
    return aliases
         
  findAlias: (alias) ->
    for provider in @config
      if provider.alias is alias
        "Alias #{alias} corresponds to #{provider.name}"
 
  sortProviders: ->
    types = @findAliases()
    for provider in @config
      if provider.active
        types[provider.alias] = provider
    return types
        
  createProviderObj: ->
    temp = {}
    providers = do @sortProviders
    
    temp.tv = new prov.SickBeard providers.tv
    temp.movie = new prov.CouchPotato providers.movie

    this.emit 'ready', temp

  returnProvider: (name) ->
    for provider in @config
      if provider.name is name
        return provider

  returnProviders: ->
    return @config

  delProvider: (id) ->
    num = ''
    temp = ''
    for provider in @config
      if provider.id is parseInt(id)
        num = _i
        temp = provider
    @config.splice(num, 1)
    do @writeConfig
    return success: true, message: "Removed Provider", provider: temp

  addProvider: (obj) ->
    temp = new prov.generic (obj)
    temp.id = 0
    delete temp._events

    for item in @config
      if item.id >= temp.id
        temp.id = item.id + 1
    
    @config.push temp
    do @writeConfig 
  
    return @config
    
  readConfig: ->
    _ref = this
 
    fs.readFile "#{__dirname}/../config.json", (err, data) ->
      if err
        console.log 'Unable to read settings.json: Imma make it.'
        do _ref.writeConfig
      else
        try
          _ref.config =  JSON.parse(data)
          _ref.emit 'stage', 'Loaded Config'
        catch error
          _ref.emit 'log', 'Error in settings file: \n#{error}'
   
  writeConfig: ->
    _ref = @config

    fs.writeFile("#{__dirname}/../config.json", JSON.stringify(@config), (err) ->
      if err then _ref.emit 'log', 'I cannot write to the file'
    )
 
  getVersion: -> JSON.parse(fs.readFileSync "#{__dirname}/../package.json", 'utf8').version
  

module.exports = Mittens
