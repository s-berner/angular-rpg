import { ElementType } from "../enums/ElementType";
import { Inputs } from "../enums/Inputs";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Enemy } from "./Enemy";
import { Grid } from "./Grid";
import { Player } from "./Player";
import { Item } from "./Item";

/** 
 * TODO: Check for collisions with other entities (enemies, items, walls, etc.)
 */
export class MoveableEntity {
  outOfBoundsMsg = 'can\'t move out of bounds';
  readonly mapWidth = 10;
  readonly mapHeight = 10;
  constructor (
    private x: number,
    private y: number) { }
    
  private moveUp(elements: GameElement[]): void {
    // Create new position object
    const newPosition = { x: this.x, y: this.y - 1 };

    // Check if new position is out of bounds
    const outOfBounds = newPosition.y < 0;
    if (outOfBounds) {
      console.log(this.outOfBoundsMsg);
      return;
    }

    // Check if new position is occupied
    const occupiedPositions = elements.map(element => {
      if ('player' == element?.type|| element instanceof Item) {
        return element.getPosition()
      }
      return;
    });
    const occupied = occupiedPositions.some(position => {
      if (position) {
        return position.x === newPosition.x && position.y === newPosition.y;
      }
      return false;
    });
    if (occupied) {
      console.log('can\'t move to occupied position');
      return;
    }

      

    this.y--;
    console.log('moved entity up to: ' + this.x + ', ' + this.y);
  }

  private moveDown(): void {
    const invalidMove = this.y > this.mapHeight - 2;
    if (invalidMove) {
      console.log(this.outOfBoundsMsg);
      return;
    }
    this.y++;
    console.log('moved entity down to: ' + this.x + ', ' + this.y);
  }

  private moveLeft(): void {
    const invalidMove = this.x < 1;
    if (invalidMove) {
      console.log(this.outOfBoundsMsg);
      return;
    }
    this.x--;
    console.log('moved entity left to: ' + this.x + ', ' + this.y);
  }

  private moveRight(): void {
    const invalidMove = this.x > this.mapWidth - 2;
    if (invalidMove) {
      console.log(this.outOfBoundsMsg);
      return;
    }
    
    this.x++;
    console.log('moved entity right to: ' + this.x + ', ' + this.y);
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  move(direction: Inputs, elements: GameElement[]): void {
    if (direction == Inputs.None) {
      return;
    }

    switch(direction) {
      case Inputs.Up:
        this.moveUp(elements);
        break;
      case Inputs.Down:
        this.moveDown();
        break;
      case Inputs.Left:
        this.moveLeft();
        break;
      case Inputs.Right:
        this.moveRight();
        break;
    }
  }
}