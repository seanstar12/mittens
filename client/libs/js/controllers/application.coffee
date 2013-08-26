ApplicationController = Ember.Controller.extend
  toggleLeft: ->
    snap = @get('snap')
    if snap.state().state == 'left'
      snap.close()
    else
      snap.open('left')

module.exports = ApplicationController
