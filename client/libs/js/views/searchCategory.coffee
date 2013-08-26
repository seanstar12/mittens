SearchCategoryView = Ember.View.extend
  classNames: ['category'],
  title: 'Movies',
  templateName: 'searchCategory',
  filteredContent: (->
    @get('content').filterProperty('imdb');
  ).property('content.@each').cacheable(),

module.exports = SearchCategoryView
