var Confidence = require('confidence');
var AppConfig = require('./config');

var criteria = {
  env: process.env.NODE_ENV
};

var manifest = {
  $meta: 'The main server manifest',
  server: {},
  connections: [{
    host: AppConfig.get('/server/host'),
    port: AppConfig.get('/server/port')
  }],
  plugins: {
    'good': AppConfig.get('/logging'),
    'hapi-auth-jwt2': {},
    'hapi-sequelized': AppConfig.get('/db/sequelize'),
    'hapi-swagger': AppConfig.get('/api/swagger'),
    './server/api/hello': {}
  }
};

var store = new Confidence.Store(manifest);

exports.get = function (key) {
  return store.get(key, criteria);
};

exports.meta = function (key) {
  return store.meta(key, criteria);
};
