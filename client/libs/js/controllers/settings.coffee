SettingsController = Ember.ObjectController.extend
  submit: ->
    store = Mittens.get('store');
    store.commit();

module.exports = SettingsController
