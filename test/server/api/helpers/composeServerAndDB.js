var Composer  = require('../../../../index');
var Promise   = require('bluebird');

module.exports = function() {
  // Promisify our Server Composer
  var ComposerAsync = Promise.promisify(Composer);

  // Compose the server
  return ComposerAsync()
    // Then sync DB
    .then(function syncDB(composedServer) {
      var db = composedServer.plugins['hapi-sequelized'].db;
      // After our DB syncs, return the composed server
      return db.sequelize.sync({force: true}).return(composedServer);
    })
}
