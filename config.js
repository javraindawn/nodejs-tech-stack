var Confidence = require('confidence');

var criteria = {
    env: process.env.NODE_ENV
};

var config = {

  $meta: 'The main Application config',

  pkg: require('./package.json'),

  server : {
    port : '8069',
    host : '0.0.0.0'
  },

  api: {
    swagger: {
      info: {
        title: 'PROJECT-API',
        description: 'The official API for the Project.',
      },
      basepath: 'http://project.local:8069',
      apiVersion: require('./package.json').version,
      authorizations: {
        jwt: {
          type: 'apiKey',
          passAs: 'header',
          keyname: 'Authorization'
        }
      }
    }
  },

  security: {
    saltWorkFactor: 10,
    jwtSecret: '$2a$10$mthZnWCucwvrd42B2Iym6edtyHnvMs6k2BMBqjb.wCjdZ.6kCkYRy'
  },

  logging : {
    opsInterval: 1000,
    reporters: {
      $filter: 'env',
      test: [],
      $default: [{
        reporter: require('good-console'),
        events: { log: '*', response: '*' }
      }]
    }
  },

  db: {
    sequelize: {
      name: process.env.LOCAL_DB_NAME,
      user: process.env.LOCAL_DB_USER,
      pass: process.env.LOCAL_DB_PASS,
      port: 5432,
      host: process.env.LOCAL_DB_HOST,
      dialect: 'postgres',
      logging: {
        $filter: 'env',
        test: false,
        $default: console.log
      },
      models: 'server/models/**/*.js'
    }
  }

}

var store = new Confidence.Store(config);

exports.get = function (key) {
    return store.get(key, criteria);
};

exports.meta = function (key) {
    return store.meta(key, criteria);
};
