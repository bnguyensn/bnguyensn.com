async function routes(fastify, options) {
  fastify.get('/', async (req, res) => {
    return { hello: 'world' };
  });
}

fastify.route({
  method: 'GET',
  url: '/',

  // Input / Output validation
  schema: {
    querystring: {
      name: { type: 'string' },
    },

    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' },
        },
      },
    },
  },

  // Pre-execution of handler
  beforeHandler: async (req, res) => {
    console.log('Pre-handler executed!');
  },

  // Handler
  handler: async (req, res) => ({ hello: 'world' }),
});

module.exports = routes;
