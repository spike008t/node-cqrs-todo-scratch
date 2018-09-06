import { CommandInterface, RepositoryInterface, EventStoreInterface } from "../interface";
import { CommandHandlerInterface, TodoInterface, RepositoryReadInterface } from "../interface";
import { Todo } from "../todo";
import { TodoCreatedEvent } from "../event";
import { TodoModel } from "../model";

export const TODO_CREATE_COMMAND = 'TODO_CREATE_COMMAND';

export class TodoCreateCommand implements CommandInterface {

  createdAt: Date;
  updatedAt: Date;

  constructor(
    readonly uuid: string,
    readonly label: string,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getData() {
    return {
      uuid: this.uuid,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      label: this.label,
    };
  }

  getCommandName(): string {
    return TODO_CREATE_COMMAND;
  }
}

export class TodoCreateCommandHandler implements CommandHandlerInterface {

  constructor(
    private readonly _todoRepository: RepositoryInterface<TodoInterface>,
    private readonly _eventStore: EventStoreInterface,
  ) {
  }

  handle(command: TodoCreateCommand) {
    console.debug(`TodoCreateCommandHandler->handle`);

    // we can create -> send event created
    this._eventStore.dispatch(
      new TodoCreatedEvent(command.getData()),
    );
  }

  listenToCommandName() {
    return TODO_CREATE_COMMAND;
  }

}
