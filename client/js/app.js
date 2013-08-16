Mittens = Ember.Application.create({
  rootElement: '#mittens',
});

DS.RESTAdapter.registerTransform('arraytostring', {
  serialize: function(value) {
    return Em.isNone(value) ? [] : value;
  },
  deserialize: function(value) {
    return Em.isNone(value) ? '' : value.toArray().join(', ');
  }
});

DS.RESTAdapter.registerTransform('object', {
  serialize: function(value) {
    return Em.isNone(value) ? {} : value;
  },
  deserialize: function(value) {
    return Em.isNone(value) ? {} : value;
  }
});

DS.RESTAdapter.map('Mittens.Movie', {
  primaryKey: 'runtime',
  title: { key: 'original_title'},
  //inLibrary: { key: 'in_library'},
  //inWanted: { key: 'in_wanted'},
});

// there must be a better way to teach the REST serializer about empty and success
Mittens.ExpressSerializer = DS.RESTSerializer.extend({
  init: function() {
    this._super();
    var get = Ember.get;

    if (!get(this, 'transforms')) {
      this.set('transforms', DS.JSONTransforms);
    }

    this.sideloadMapping = Ember.Map.create();
    this.metadataMapping = Ember.Map.create();

    this.configure({
      meta: 'meta',
      since: 'since',
      empty: 'empty',
      sucess: 'success'
    });
  },
  primaryKey: function(type) {
    switch (type.toString()) {
      case 'Mittens.Movie':
        return 'imdb';
    }
  },
});

// Create ember-data datastore and define our adapter
Mittens.store = DS.Store.create({
  adapter: DS.RESTAdapter.create({
    serializer: Mittens.ExpressSerializer,
  })
});

Mittens.Movie = DS.Model.extend({
  title: DS.attr('string'),
  imdb: DS.attr('string'),
  year: DS.attr('string'),
  plot: DS.attr('string'),
  isRequested: DS.attr('boolean'),
  runtime: DS.attr('number'),
  genres: DS.attr('arraytostring'),
  images: DS.attr('object'),
  poster: function () {
    return this.get('images').poster[0];
  }.property('images'),
});

Mittens.SearchBoxComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['search-box'],
  label: 'Search',
  query: '',
  hasSearched: false,
  submit: function() {
    this.set('content',Mittens.Movie.find({q: this.get('query')}));
    this.set('hasSearched', true);
  },
});

Mittens.SearchItemController = Ember.ObjectController.extend({
  isOpen: false,
  toggle: function() {
     this.set('isOpen',!this.get('isOpen'));
  },
  request: function() {
    var store = Mittens.get('store');

    var item = this.get('content');
    var transaction = store.transaction();
    transaction.add(item);

    item.set('isRequested', true);

    transaction.commit();
  },
});

Mittens.SearchItemView = Ember.View.extend({
  tagName: 'li',
  templateName: 'searchItem',
});

Mittens.SearchCategoryView = Ember.View.extend({
  classNames: ['category'],
  title: 'Movies',
  templateName: 'searchCategory',
  filteredContent: function() {
    return this.get('content').filterProperty('imdb');
  }.property('content.@each').cacheable(),
});

Mittens.SearchField = Ember.TextField.extend({
  name: 'search',
  viewName: 'search',
  placeholder: 'Search',
  attributeBindings: ['autocomplete'],
  autocomplete: 'off',
  didInsertElement: function() {
    this.$().focus();
  },
  insertNewline: function() {
    this.get('controller').submit();
    this.$().blur();
  },
});

Mittens.Provider = DS.Model.extend({
  name: DS.attr('string'),
  host: DS.attr('string'),
  port: DS.attr('string'),
  api: DS.attr('string'),
  alias: DS.attr('string'),
  active: DS.attr('string'),
});

Mittens.SettingsRoute = Ember.Route.extend({
  model: function() {
    return Mittens.Provider.createRecord({});
  },
});

Mittens.SettingsController = Ember.ObjectController.extend({
  submit: function() {
    var store = Mittens.get('store');
    store.commit();
  },
});

MediaClass("small", ".search-box:media(this-max-width: 30em)");
