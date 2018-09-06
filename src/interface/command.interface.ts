
export interface CommandInterface {
  getCommandName(): string;
}

export interface CommandHandlerInterface {
  handle(command: CommandInterface): void;
  listenToCommandName(): string;
}
