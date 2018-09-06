import { EventInterface, EventHandlerInterface, TodoInterface, CommandBusInterface, EventStoreInterface, RepositoryReadInterface, RepositoryInterface } from "../interface";
import { Todo } from "../todo";

export const TODO_CREATED_EVENT = 'TODO_CREATED_EVENT';

export class TodoCreatedEvent implements EventInterface {

  constructor(
    readonly data: any,
  ) {
  }

  getEventName() {
    return TODO_CREATED_EVENT;
  }
}

export class TodoCreatedEventHandler implements EventHandlerInterface {

  constructor(
    private readonly _commandBus: CommandBusInterface,
    private readonly _todoRepository: RepositoryInterface<TodoInterface>,
  ) {}

  handle(event: TodoCreatedEvent) {
    console.log('TodoCreatedEventHandler');

    const entry = new Todo(event.data.uuid, event.data.label, event.data.state, event.data.createdAt, event.data.updatedAt);
    // entry.createdAt = event.data.createdAt;
    // entry.updatedAt = event.data.updatedAt;
    this._todoRepository.add(entry);
  }

  listenToEvents() {
    return [
      TODO_CREATED_EVENT
    ];
  }
}