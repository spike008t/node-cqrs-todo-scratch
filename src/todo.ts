import { TodoInterface, AggregateRootInterface, EventInterface } from "./interface";


export class Todo implements TodoInterface, AggregateRootInterface {

  id?: string;
  label?: string;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor() {
  }

  apply(event: EventInterface) {

  }
}