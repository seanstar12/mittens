SettingsRoute = Ember.Route.extend
  model: ->
    Mittens.Provider.createRecord({});

module.exports = SettingsRoute
