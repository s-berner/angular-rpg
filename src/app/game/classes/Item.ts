import { Position } from "../interfaces/Position";
import { ElementType } from "../enums/ElementType";

export class Item {
  readonly type = ElementType.Item;
  readonly position: { x: number, y: number };
  constructor(
    readonly name: string,
    readonly description: string,
    x: number,
    y: number,
    readonly attributes: { dmg: number, def: number, evade: number }
  ) { 
    this.position = { x, y }; 
  }

  getPosition(): Position {
    return this.position;
  }
}
