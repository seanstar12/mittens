ApplicationView = Ember.View.extend
  didInsertElement: ->
    snapper = new Snap
      element: document.getElementById('main'),
      slideIntent: 15,

module.exports = ApplicationView
