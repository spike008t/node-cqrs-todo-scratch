import { CommandBusInterface, CommandHandlerInterface, CommandInterface } from "./interface";

export class CommandBusInMemory implements CommandBusInterface {

  private readonly _handlers = new Map<string, CommandHandlerInterface[]>();
  private readonly _commands: CommandInterface[] = [];

  private readonly _queue: any[] = [];
  private  _active: number = 0;
  private _maxActive: number = 1;

  constructor(
  ) {}

  registerHandler(handler: CommandHandlerInterface) {
    const commandName = handler.listenToCommandName();
    const handlers = this._handlers.get(commandName) || [];
    handlers.push(handler);
    this._handlers.set(commandName, handlers);

    console.debug(`register handler for command name ${commandName}`);
  }
  registerHandlers(handlers: CommandHandlerInterface[]) {
    handlers.forEach((handler) => {
      this.registerHandler(handler);
    });
  }

  dispatch(command: CommandInterface): Promise<any> {
    const commandName = command.getCommandName();
    if (this._handlers.has(commandName)) {
      const handlers = this._handlers.get(commandName);
      if (handlers) {
        return Promise.all(handlers.map(handler => {
          this.enqueue(() => {
            console.log(`ENQUEUE COMMAND`);
            handler.handle(command);
          });
        }));
      }
    }
    return Promise.reject(`No handler`);
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
