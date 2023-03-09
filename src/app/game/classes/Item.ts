import { Position } from "../interfaces/Position";
import { ElementType } from "../enums/ElementType";
import { Player } from "./Player";

export class Item {
  readonly type = ElementType.Item;
  readonly position: { x: number, y: number };
  constructor(
    readonly name: string,
    readonly description: string,
    readonly display: string,
    readonly id: string,
    x: number,
    y: number,
  ) {
    this.position = { x, y };
  }

  getPosition(): Position {
    return this.position;
  }

  action(player: Player) {
    player.heal(5);
  }
}
