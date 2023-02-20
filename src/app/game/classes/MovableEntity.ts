import { Inputs } from "../enums/Inputs";
import { Position } from "../interfaces/Position";

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
    
  private moveUp(): void {
    const invalidMove = this.y < 1;
    if (invalidMove) {
      console.log(this.outOfBoundsMsg);
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

  move(direction: Inputs): void {
    if (direction == Inputs.None) {
      return;
    }

    switch(direction) {
      case Inputs.Up:
        this.moveUp();
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