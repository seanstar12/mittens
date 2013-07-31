Mittens = Ember.Application.create();

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

Mittens.SearchRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('search', { into: 'application', outlet: 'main'});
  },
});

Mittens.SearchController = Ember.ArrayController.extend({
  query: '',

  submit: function(model) {
    this.set('content',Mittens.Movie.find({search: this.get('query')}));
  },
});
