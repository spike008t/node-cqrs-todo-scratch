import { TodoInterface, AggregateRootInterface, EventInterface, AggregateRootAbstract } from "./interface";

export class Todo extends AggregateRootAbstract {
  uuid: string;
  label?: string;
  state?: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(
    _uuid: string,
    _label?: string,
    _state?: string,
    _createdAt?: Date,
    _updatedAt?: Date,
  ) {
    super();

    this.uuid = _uuid;
    this.label = _label;
    this.state = _state;
    this.createdAt = _createdAt;
    this.updatedAt = _updatedAt;
  }
}