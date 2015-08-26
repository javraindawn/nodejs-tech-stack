exports.register = function(server, options, next) {
  server.route({
    method: 'GET',
    path:'/hello',
    config: {
      tags: ['api', 'hello'],
      description: 'Hello World',
      notes: 'Returns a hello world with the hostname.',
      auth: false
    },
    handler: function (request, reply) {
      reply('hello world ' + process.env.HOSTNAME);
    }
  });

  next();
}

exports.register.attributes = {
  name: 'project-api-hello',
  version: '1.0.0'
}
