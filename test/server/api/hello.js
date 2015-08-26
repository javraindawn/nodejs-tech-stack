var Lab         = require("lab");
var Code        = require('code');
var expect      = Code.expect;
var lab         = exports.lab = Lab.script();

lab.experiment("Hello", function() {

  var server;

  lab.before(function(done) {
    // Compose and sync DB
    require('./helpers/composeServerAndDB')()
      .then(function(composedServer) {
        server = composedServer;
        return server;
      })
      .asCallback(done);
  });

  lab.test("Should return a string", function(done) {
    var options = {
      method: "GET",
      url: "/hello"
    };

    server.inject(options, function(response) {
      
      expect(response.statusCode).to.equal(200);
      expect(response.payload).to.be.a.string();

      done();
    });
  });

});
