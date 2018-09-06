import { CommandInterface, RepositoryInterface } from "../interface";
import { CommandHandlerInterface, TodoInterface, RepositoryReadInterface } from "../interface";
import { Todo } from "../todo";

export const TODO_CREATE_COMMAND = 'TODO_CREATE_COMMAND';

export class TodoCreateCommand implements CommandInterface {

  createdAt: Date;
  updatedAt: Date;

  constructor(
   readonly label: string,
  ) {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  getData() {
    return {
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
    private readonly _todoRepository: RepositoryInterface<TodoInterface>
  ) {
  }

  handle(command: TodoCreateCommand) {
    console.debug(`TodoCreateCommandHandler->handle`);
    this._todoRepository.create(command.getData());
  }

  listenToCommandName() {
    return TODO_CREATE_COMMAND;
  }

}
