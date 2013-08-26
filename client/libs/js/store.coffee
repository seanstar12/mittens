# there must be a better way to teach the REST serializer about empty and success
ExpressSerializer = DS.RESTSerializer.extend
  init: ->
    @_super();
    get = Ember.get;

    if (!get(@, 'transforms'))
      @set('transforms', DS.JSONTransforms);

    @sideloadMapping = Ember.Map.create();
    @metadataMapping = Ember.Map.create();

    @configure
      meta: 'meta',
      since: 'since',
      empty: 'empty',
      sucess: 'success'

  primaryKey: (type) ->
    switch type.toString()
      when 'Mittens.Movie'
        return 'imdb';

DS.RESTAdapter.registerTransform 'arraytostring',
  serialize: (value) ->
    if Em.isNone(value) then [] else value;
  deserialize: (value) ->
    if Em.isNone(value) then '' else value.toArray().join(', ');

DS.RESTAdapter.registerTransform 'object',
  serialize: (value) ->
    if Em.isNone(value) then {} else value;
  deserialize: (value) ->
    if Em.isNone(value) then {} else value;

DS.RESTAdapter.map 'Mittens.Movie',
  primaryKey: 'runtime',
  title:
    key: 'original_title'

# Create ember-data datastore and define our adapter
Store = DS.Store.extend
  adapter: DS.RESTAdapter.extend
    serializer: ExpressSerializer

module.exports = Store
