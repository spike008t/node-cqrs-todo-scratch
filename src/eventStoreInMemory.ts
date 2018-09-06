import { EventStoreInterface, EventInterface, EventHandlerInterface } from "./interface";

export class EventStoreInMemory implements EventStoreInterface {

  private readonly events: any[] = [];
  private readonly _handlers: Map<string, EventHandlerInterface[]> = new Map();

  private readonly _queue: any[] = [];
  private  _active: number = 0;
  private _maxActive: number = 1;

  constructor() {}

  registerHandler(eventHandler: EventHandlerInterface) {
    const eventNames = eventHandler.listenToEvents();
    eventNames.forEach(eventName => {
      const handlers = this._handlers.get(eventName) || [];
      handlers.push(eventHandler);
      this._handlers.set(eventName, handlers);

      console.debug(`register handler for event name ${eventName}`);
    });
  }

  registerHandlers(eventHandlers: EventHandlerInterface[]) {
    eventHandlers.forEach(handler => {
      this.registerHandler(handler);
    })
  }

  dispatch(event: EventInterface) {
    const eventName = event.getEventName();
    if (this._handlers.has(eventName)) {
      const handlers = this._handlers.get(eventName);
      if (handlers) {
        handlers.forEach(handler => {
          this.enqueue(() => {
            console.log(`ENQUEUE EVENT`);
            handler.handle(event);
          });
        });
      }
    }
  }

  async enqueue(func: () => any) {
    if (++this._active > this._maxActive) {
      await new Promise(resolve => this._queue.push(resolve));
    }

    try {
      return await func();
    } catch (err) {
      throw err;
    } finally {
      this._active--;
      if (this._queue.length) {
        this._queue.shift()();
      }
    }
  }
}
