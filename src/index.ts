
import Fastify from "fastify";
import { CommandBusInterface, EventStoreInterface, CommandInterface, CommandHandlerInterface } from "./interface";
import { TodoCreateCommand, TodoCreateCommandHandler, TodoDeleteCommandHandler, TodoDeleteCommand } from "./command";
import { CommandBusInMemory } from "./commandBusInMemory";
import { EventStoreInMemory } from "./eventStoreInMemory";
import { TodoRepository } from "./todo.repository";
import { TodoCreatedEventHandler } from "./event";

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

commandBus.registerHandlers([
  new TodoCreateCommandHandler(todoRepository),
  new TodoDeleteCommandHandler(todoRepository),
]);

eventStore.registerHandlers([
  new TodoCreatedEventHandler(commandBus, todoRepository),
]);

fastify.get('/api/todo/:id', async (request, reply) => {
  const entry = todoRepository.get(request.params.id);
  return {todo: entry};
});

fastify.put('/api/todo', async (request, reply) => {

  // here send command
  commandBus.dispatch(
    new TodoCreateCommand('test')
  );

  return {TODO: 'todo'};
});

fastify.post('/api/todo/:id', async (request, reply) => {
  return {TODO: 'todo'};
});

fastify.delete('/api/todo/:id', async (request, reply) => {
  commandBus.dispatch(
    new TodoDeleteCommand(request.params.id),
  );
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
