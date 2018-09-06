import { TodoRepositoryInterface, TodoInterface, EventStoreInterface, CommandBusInterface } from "./interface";
import { TodoCreatedEvent } from "./event";

export class TodoRepository implements TodoRepositoryInterface {

  private readonly _entries: Map<string, TodoInterface> = new Map();

  constructor(
    private readonly _eventStore: EventStoreInterface,
    private readonly _commandBus: CommandBusInterface,
  ) {
  }

  add(item: TodoInterface): string {
    this._entries.set(item.uuid, item);
    return item.uuid;
  }

  delete(uuid: string) {
    this._entries.delete(uuid);
  }

  has(uuid: string) {
    return this._entries.has(uuid);
  }

  get(uuid: string) {
    return this._entries.get(uuid);
  }

  getAll() {
    return [];
  }

  update() {

  }

  create(data: any) {
    this._eventStore.dispatch(
      new TodoCreatedEvent(data)
    );
  }
}
