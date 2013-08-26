App = require './app'

App.Router.map ->
  @resource 'settings', { path: 'settings' }, ->
    @route 'index', { path: '/' }

