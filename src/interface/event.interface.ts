
export interface EventInterface {
  getEventName(): string;
}

export interface EventHandlerInterface {
  handle(event: EventInterface): void;
  listenToEvents(): string[];
}