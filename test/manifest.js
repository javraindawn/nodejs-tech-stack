var Lab       = require('lab');
var Code      = require('code');
var Manifest  = require('../manifest');
var expect    = Code.expect;
var lab       = exports.lab = Lab.script();

lab.experiment('Manifest', function () {

  lab.test('Should get the Manifest data as an Object', function (done) {
    expect(Manifest.get('/')).to.be.an.object();

    done();
  });

  lab.test('Should get the Manifest meta data', function (done) {
    expect(Manifest.meta('/')).to.match(/The main server manifest/i);

    done();
  });

});
