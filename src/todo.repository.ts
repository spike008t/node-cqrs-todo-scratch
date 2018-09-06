import { TodoRepositoryInterface, TodoInterface, EventStoreInterface, CommandBusInterface } from "./interface";
import { TodoCreatedEvent } from "./event";

export class TodoRepository implements TodoRepositoryInterface {

  private readonly _entries: TodoInterface[] = [];

  constructor(
    private readonly _eventStore: EventStoreInterface,
    private readonly _commandBus: CommandBusInterface,
  ) {
  }

  add(item: TodoInterface): string {
    item.id = `${this._entries.length}`;
    this._entries.push(item);
    console.log(`total entry: ${this._entries.length}`);
    return item.id;
  }

  delete() {

  }

  has(id: string) {
    if (isNaN(parseInt(id, 10)) === false) {
      const idx = parseInt(id, 10);
      if (idx >= 0 && idx < this._entries.length) {
        return true;
      }
    }
    return false;
  }

  get(id: string) {
    if (isNaN(parseInt(id, 10)) === false) {
      const idx = parseInt(id, 10);
      if (idx >= 0 && idx < this._entries.length) {
        return this._entries[idx];
      }
    }
    return undefined;
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
