SearchField = Ember.TextField.extend
  name: 'search',
  viewName: 'search',
  placeholder: 'Search',
  attributeBindings: ['autocomplete'],
  autocomplete: 'off',
  didInsertElement: ->
    this.$().focus();
  insertNewline: ->
    @get('controller').submit();
    this.$().blur();

module.exports = SearchField
