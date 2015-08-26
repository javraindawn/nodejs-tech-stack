var Lab       = require('lab');
var Code      = require('code');
var Composer  = require('../index');
var expect    = Code.expect;
var lab       = exports.lab = Lab.script();

lab.experiment('App', function () {

    lab.test('Should compose a Server Object', function (done) {
        Composer(function (err, composedServer) {
            expect(composedServer).to.be.an.object();

            done(err);
        });
    });

});
