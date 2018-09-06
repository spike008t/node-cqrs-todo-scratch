
import Fastify from "fastify";
import { TodoCreateCommandHandler, TodoDeleteCommandHandler, TodoDeleteCommand } from "./command";
import { CommandBusInMemory } from "./commandBusInMemory";
import { EventStoreInMemory } from "./eventStoreInMemory";
import { TodoRepository } from "./todo.repository";
import { TodoCreatedEventHandler } from "./event";
import { TodoService } from "./todo.service";

const fastify = Fastify({
  logger: true,
});

const PORT = process.env.PORT || '8000';

const eventStore = new EventStoreInMemory();
const commandBus = new CommandBusInMemory();
const todoRepository = new TodoRepository(
  eventStore,
  commandBus,
);

const todoService = new TodoService(
  eventStore,
  commandBus,
  todoRepository,
);

fastify.get('/api/todo/:uuid', async (request, reply) => {
  const entry = todoRepository.get(request.params.uuid);
  return {todo: entry};
});

fastify.put('/api/todo', async (request, reply) => {

  const uuid = todoService.create({
    label: 'test',
  });

  return {action: 'create', uuid: uuid};
});

fastify.post('/api/todo/:uuid', async (request, reply) => {
  return {TODO: 'todo'};
});

fastify.delete('/api/todo/:uuid', async (request, reply) => {
  todoService.delete(request.params.uuid);
  return {action: 'delete', uuid: request.params.uuid};
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
