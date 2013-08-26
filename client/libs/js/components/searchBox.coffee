SearchBoxComponent = Ember.Component.extend
  tagName: 'section',
  classNames: ['search-box'],
  label: 'Search',
  query: '',
  hasSearched: false,
  submit: ->
    @set('content',Mittens.Movie.find({q: @get('query')}));
    @set('hasSearched', true);

module.exports = SearchBoxComponent
