import { EventInterface } from "./event.interface";
import { version } from "punycode";

export interface AggregateRootInterface {

  applyChange(event: EventInterface): void;
  loadFromHistory(events: EventInterface[]): void;
  markChangesAsCommited(): void;
  getUncommitedChanges(): EventInterface[];

  getVersion(): number;
}

export abstract class AggregateRootAbstract implements AggregateRootInterface {

  private readonly _changes: any[] = [];
  abstract uuid: string;
  _version: number = 0;

  getVersion() {
    return this._version;
  }

  applyChange(event: EventInterface) {
    this.apply(event);
  }

  apply(event: EventInterface, isNew: boolean = true) {
    if (isNew) {
      this._changes.push(event);
    }
  }

  loadFromHistory(events: EventInterface[]) {
    events.forEach(event => {
      this.applyChange(event);
    })
  }

  markChangesAsCommited() {
    this._changes.length = 0;
  }

  getUncommitedChanges() {
    return this._changes;
  }
}
