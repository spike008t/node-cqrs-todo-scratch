import { EventInterface } from "./event.interface";

export interface AggregateRootInterface {
  apply(event: EventInterface): void;
}
