var sql = require('sqlite3').verbose();

exports.loadConfig = function (providers, cb) {
  var db = new sql.Database('mittens.db');
  db.all("SELECT rowid AS id, * FROM providers", function (err, rows){
    for ( var row in rows ) {
      providers[rows[row].name]['config'] = {host:rows[row].host,port:rows[row].port,api:rows[row].api};
    }
    cb(providers); 
  });
  db.close();
};

exports.initDb = function () {
  var db = new sql.Database('mittens.db');
  console.log('initDb');
  db.run("CREATE TABLE providers (name TEXT, host TEXT, port TEXT, api TEXT)");
  db.close();
}

exports.rmProvider = function (name, cb) {
  var db = new sql.Database('mittens.db');
  db.run("DELETE FROM providers WHERE name = (?)",name);
  console.log('deleted: ' + name);
  db.close();
}

exports.listProviders = function() {
  var db = new sql.Database('mittens.db');
  console.log('listProviders');
  db.all("SELECT rowid AS id, * FROM providers", function (err, rows){
    console.log(rows);
  });
  db.close();
}

exports.addProviders = function (conf) {
  var db = new sql.Database('mittens.db');
  for ( var provider in conf ) {
    console.log(conf[provider]);
    var item = conf[provider];
     
    if (   item.name != '' 
        && item.host != '' 
        && item.port != '' 
        && item.api != '') {
      
      console.log('Adding to DB');
      db.run("INSERT INTO providers VALUES (?,?,?,?)",[item.name,item.host,item.port,item.api]);
    }
  }
  db.close();
}

exports.closeDb = function () {
  db.close();
  console.log('DB Closed.');
}

