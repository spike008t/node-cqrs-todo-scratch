import { EventInterface } from "../interface";

export const TODO_DELETED_EVENT = 'TODO_DELETED_EVENT';

export class TodoDeletedEvent implements EventInterface {
  getEventName() {
    return TODO_DELETED_EVENT;
  }
}