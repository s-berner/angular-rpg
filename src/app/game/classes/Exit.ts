import { ElementType } from "../enums/ElementType";
import { Position } from "../interfaces/Position";

export class Exit {
  readonly type = ElementType.Exit;
  readonly display = '🕳️';

  constructor (
    readonly gainExp: number,
    readonly goToStage: number,
    readonly x: number,
    readonly y: number,        
  ) { }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }
}
