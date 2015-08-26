var Lab       = require('lab');
var Code      = require('code');
var AppConfig = require('../config');
var expect    = Code.expect;
var lab       = exports.lab = Lab.script();

lab.experiment('Config', function () {

  lab.test('Should get the Config data as an Object', function (done) {
    expect(AppConfig.get('/')).to.be.an.object();

    done();
  });

  lab.test('Should get the Config meta data', function (done) {
    expect(AppConfig.meta('/')).to.match(/The main Application config/i);

    done();
  });

});
