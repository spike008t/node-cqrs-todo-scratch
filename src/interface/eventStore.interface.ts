import { EventInterface, EventHandlerInterface } from "./event.interface";

export interface EventStoreInterface {

  registerHandler(eventHandler: EventHandlerInterface): void;
  registerHandlers(eventHandlers: EventHandlerInterface[]): void;

  dispatch(event: EventInterface): void;
}
