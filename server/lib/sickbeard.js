var Provider = require('./provider');

function CouchPotato() {
  Provider.call(this);
}

CouchPotato.prototype = new Provider();
CouchPotato.prototype.constructor = CouchPotato;

CouchPotato.prototype.url = {
  test: {str: 'app.available'},
  find: {str: 'movie.search/?q='},
  update: {str: '/movie.add/?identifier='},
//  findMany: {str: '/movie.list/?', statusStr:'status=', searchStr:'&search'},
  add: {str: 'movie.add/?identifier='}
}

module.exports = CouchPotato;
