Mittens = Ember.Application.create({
  rootElement: '#mittens',
});

DS.SocketAdapter.map('Mittens.Movie', {
  primary_key: 'tmdb_id',
  title: { key: 'original_title'},
});

// Create ember-data datastore and define our adapter
Mittens.store = DS.Store.create({
  adapter: DS.SocketAdapter.create({})
});

Mittens.Movie = DS.Model.extend({
  title: DS.attr('string'),
  year: DS.attr('string'),
});

Mittens.MovieController = Ember.ObjectController.extend({});
Mittens.MovieView = Ember.View.extend({});


Mittens.MoviesRoute = Ember.Route.extend({
  model: function() {
    return Mittens.Movie.find({search: 'super'});
  }
});

Mittens.SearchBoxComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['search-box'],
  label: 'Search',
  query: '',
  submit: function() {
    this.set('content',Mittens.Movie.find({search: this.get('query')}));
  },
});

Mittens.SearchItemComponent = Ember.Component.extend({
  classNameBindings: ['isOpen:open'],
  isOpen: false,
});

Mittens.SearchField = Ember.TextField.extend({
  name: 'search',
  viewName: 'search',
  placeholder: 'Search',
  attributeBinding: ['autofocus'],
  didInsertElement: function() {
    this.$().focus();
  },
  insertNewline: function() {
    this.get('controller').submit();
  },
});
