Provider = DS.Model.extend
  name: DS.attr('string'),
  host: DS.attr('string'),
  port: DS.attr('string'),
  api: DS.attr('string'),
  alias: DS.attr('string'),
  active: DS.attr('string'),

module.exports = Provider
