import { CommandInterface } from "../interface";

export const TODO_LABE_CHANGEDL_COMMAND = 'TODO_LABE_CHANGEDL_COMMAND';

export class TodoChangeLabelCommand implements CommandInterface {

  constructor(
    readonly id: string,
    readonly newLabel: string,
  ) {
  }

  getCommandName() {
    return TODO_LABE_CHANGEDL_COMMAND;
  }
}
