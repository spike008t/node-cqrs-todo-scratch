import { EventInterface } from "../interface";

export const TODO_UPDATED_EVENT = 'TODO_UPDATED_EVENT';

export class TodoUpdatedEvent implements EventInterface {

  getEventName() {
    return TODO_UPDATED_EVENT;
  }

}