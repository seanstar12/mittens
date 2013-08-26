App = Ember.Application.create
  rootElement: '#mittens'

App.Router.reopen
  location: 'history'

module.exports = App
