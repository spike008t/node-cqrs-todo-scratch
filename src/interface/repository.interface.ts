import { EventStoreInterface } from "./eventStore.interface";
import { CommandBusInterface } from "./commandBus.interface";

export interface RepositoryBase {
  readonly _eventStore?: EventStoreInterface;
  readonly _commandBus?: CommandBusInterface;
}

export interface RepositoryReadInterface<T> {
  get(id: string): T | undefined;
  getAll(): T[];
  has(id: string): boolean;
}

export interface RepositoryWriteInterface<T> {
  create(data: any): void;
  add(item: T): string;
  delete(id: string): void;
  update(item: T): void;
}

export interface RepositoryInterface<T> extends RepositoryReadInterface<T>, RepositoryWriteInterface<T> {
}
