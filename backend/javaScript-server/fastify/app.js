// app.js
const fastify = require('fastify')({ logger: true });

// simple route
fastify.get('/', async (request, reply) => {
    return { message: 'Hello Fastify!' };
});

module.exports = fastify;
