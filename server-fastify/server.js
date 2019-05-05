const fastify = require('fastify')({ logger: true });
const helmet = require('fastify-helmet');

fastify.register(require('./route'));
fastify.register(helmet);



const start = async () => {
  try {
    await fastify.listen(3000, '::', (err, address) => {
      if (err) {
        fastify.log.error(err);
        process.exit(1);
      }
      fastify.log.info(`server listening on ${address}`);
    });
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();