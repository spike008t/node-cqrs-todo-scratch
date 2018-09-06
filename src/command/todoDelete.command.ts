import { CommandInterface, CommandHandlerInterface, TodoInterface, RepositoryReadInterface, RepositoryInterface } from "../interface";

export const TODO_DELETE_COMMAND = 'TODO_DELETE_COMMAND';

export class TodoDeleteCommand implements CommandInterface {

  constructor(
    readonly id: string,
  ) {
  }

  getCommandName() {
    return TODO_DELETE_COMMAND;
  }
}

export class TodoDeleteCommandHandler implements CommandHandlerInterface {

  constructor(
    private readonly _todoRepository: RepositoryInterface<TodoInterface>
  ) {
  }

  handle(command: TodoDeleteCommand) {
    console.debug(`[DELETE] ${command.id}`);
    const entry = this._todoRepository.get(command.id)
    if (entry) {
      this._todoRepository.delete
    }
  }

  listenToCommandName() {
    return TODO_DELETE_COMMAND;
  }

}