ApplicationView = Ember.View.extend
  didInsertElement: ->
    snapper = new Snap
      element: document.getElementById('main'),
      slideIntent: 15,
      touchToDrag: false

    snapper.on 'open', ->
      console.log 'has closed'

    snapper.on 'close', ->
      console.log 'has closed'

    snapper.on 'animated', ->
      console.log 'has expanded Left'

    @controller.set('snap',snapper)


module.exports = ApplicationView
