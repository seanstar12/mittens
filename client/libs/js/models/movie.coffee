Movie = DS.Model.extend
  title: DS.attr('string'),
  imdb: DS.attr('string'),
  year: DS.attr('string'),
  plot: DS.attr('string'),
  isRequested: DS.attr('boolean'),
  runtime: DS.attr('number'),
  genres: DS.attr('arraytostring'),
  images: DS.attr('object'),
  poster: (->
    @get('images').poster[0];
  ).property('images'),

module.exports = Movie
