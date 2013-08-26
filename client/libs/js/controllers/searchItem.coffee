SearchItemController = Ember.ObjectController.extend
  isOpen: false,
  toggle: ->
     @set('isOpen',!@get('isOpen'));
  request: ->
    store = Mittens.get('store');

    item = @get('content');
    transaction = store.transaction();
    transaction.add(item);

    item.set('isRequested', true);

    transaction.commit();

module.exports = SearchItemController
