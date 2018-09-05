
import Fastify from "fastify";

const fastify = Fastify();
const PORT = process.env.PORT || '8000';

fastify.get('/api/todo/:id', async (request, reply) => {
  return {TODO: 'todo'};
});

fastify.put('/api/todo', async (request, reply) => {
  return {TODO: 'todo'};
});

fastify.post('/api/todo/:id', async (request, reply) => {
  return {TODO: 'todo'};
});

fastify.delete('/api/todo/:id', async (request, reply) => {
  return {TODO: 'todo'};
});

const start = async () => {
  try {
    await fastify.listen(PORT);
    fastify.log.info(`server listening on ${fastify.server.address()}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
