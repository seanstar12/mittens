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
  didInsertElement: function() {
    this.get('content').one('didLoad', function() {
       alert("I LOADED!");
    });
  },
  toggle: function() {
     this.set('isOpen',!this.get('isOpen'));
  },
  request: function() {
    var store = Mittens.get('store');

    var item = this.get('content');
    var transaction = store.transaction();
    transaction.add(item);

    item.set('isRequested', true);
    item.set('id', item.get('imdb'));
    console.log('isError: '+item.get('isError'));
    console.log('isDirty: '+item.get('isDirty'));
    console.log(item);

    transaction.commit();
    store.commit();
    console.log('commit');
  },
});

Mittens.SearchItemView = Ember.View.extend({
  tagName: 'li',
  templateName: 'searchItem',
});

Mittens.SearchCategoryView = Ember.View.extend({
  classNames: ['category'],
  title: 'Movies',
  status: function() {
    if(this.get('content.isLoaded')) {
      return this.get('content.length');
    } else {
      return 'loading';
    }
  }.property('content.isLoaded'),
  templateName: 'searchCategory',
});

Mittens.SearchCategoryList = Ember.CollectionView.extend({
  tagName: 'ul',
  itemViewClass: Mittens.SearchItemView,
});

Mittens.SearchItemComponent = Ember.Component.extend({
  classNameBindings: ['isOpen:open'],
  isOpen: false,
  toggleActions: function() {
     this.toggleProperty('isOpen');
  },
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

MediaClass("small", ".search-box:media(this-max-width: 30em)");
