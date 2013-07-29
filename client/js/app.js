Mittens = Ember.Application.create();

Mittens.Movie = DS.Model.extend({
  primary_key: 'tmdb_id',
  original_title: DS.attr('string'),
  year: DS.attr('string'),
});

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
