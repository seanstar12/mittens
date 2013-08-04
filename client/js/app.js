Mittens = Ember.Application.create({
  rootElement: '#mittens',
});

DS.SocketAdapter.map('Mittens.Movie', {
  primaryKey: 'tmdb_id',
  title: { key: 'original_title'},
  inLibrary: { key: 'in_library'},
  inWanted: { key: 'in_wanted'},
});

// Create ember-data datastore and define our adapter
Mittens.store = DS.Store.create({
  adapter: DS.SocketAdapter.create({})
});

Mittens.Movie = DS.Model.extend({
  title: DS.attr('string'),
  year: DS.attr('string'),
});

Mittens.SearchBoxComponent = Ember.Component.extend({
  tagName: 'section',
  classNames: ['search-box'],
  label: 'Search',
  query: '',
  hasSearched: false,
  submit: function() {
    this.set('content',Mittens.Movie.find({search: this.get('query')}));
    this.set('hasSearched', true);
  },
});

Mittens.SearchItemView = Ember.View.extend({
  templateName: 'searchItem',
  classNameBindings: ['isOpen:open'],
  isOpen: false,
  toggleActions: function() {
     this.toggleProperty('isOpen');
  },
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
