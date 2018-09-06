import { CommandInterface } from "../interface";

export const TODO_UPDATE_COMMAND = 'TODO_UPDATE_COMMAND';

export class TodoUpdateCommand implements CommandInterface {

  constructor(
    readonly id: string,
    readonly title: string,
  ) {

  }

  getCommandName() {
    return TODO_UPDATE_COMMAND;
  }

}
