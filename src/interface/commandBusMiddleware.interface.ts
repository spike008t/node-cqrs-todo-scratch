import { CommandInterface } from "./command.interface";

export interface CommandBusMiddleware {
  dispatch(command: CommandInterface): void;
}
