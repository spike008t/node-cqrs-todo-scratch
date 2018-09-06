import { CommandInterface, CommandHandlerInterface } from "./command.interface";

export interface CommandBusInterface {

  registerHandler(commandHandler: CommandHandlerInterface): void;
  registerHandlers(commandHandlers: CommandHandlerInterface[]): void;

  dispatch(command: CommandInterface): Promise<any>;
}
