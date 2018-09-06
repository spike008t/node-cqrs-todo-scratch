
import { EventStoreInterface, CommandBusInterface, RepositoryInterface, TodoInterface } from "./interface";
import { TodoCreateCommand, TodoDeleteCommand, TodoCreateCommandHandler, TodoDeleteCommandHandler } from "./command";
import { Todo } from "./todo";
import { TodoCreatedEventHandler } from "./event";

const uuidv1 = require('uuid/v1');

export class TodoService {

  constructor(
    private readonly _eventStore: EventStoreInterface,
    private readonly _commandBus: CommandBusInterface,
    private readonly _repository: RepositoryInterface<TodoInterface>
  ) {

    this._commandBus.registerHandlers([
      new TodoCreateCommandHandler(this._repository, this._eventStore),
      new TodoDeleteCommandHandler(this._repository),
    ]);

    this._eventStore.registerHandlers([
      new TodoCreatedEventHandler(this._commandBus, this._repository),
    ]);
  }

  get(uuid: string): Todo|undefined {
    return undefined;
  }

  create(data: any): string {
    // create new uuid
    const uuid = uuidv1();
    this._commandBus.dispatch(
      new TodoCreateCommand(uuid, data.label)
    );
    return uuid;
  }

  delete(uuid: string): void {
    this._commandBus.dispatch(
      new TodoDeleteCommand(uuid),
    );
  }
}
