import { ElementType } from "../enums/ElementType";
import { Inputs } from "../enums/Inputs";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Enemy } from "./Enemy";

export class MoveableEntity {
  outOfBoundsMsg = 'can\'t move out of bounds';
  readonly mapWidth = 10;
  readonly mapHeight = 10;
  constructor (
    private x: number,
    private y: number) { }
    
  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  move(direction: Inputs, elements: GameElement[], myType: ElementType): GameElement[] {
    if (direction == Inputs.None) {
      return elements;
    }

    // get desired position
    const desiredPos: Position = this.getPosition(); 
    switch(direction) {
      case Inputs.Up:
        desiredPos.y--;
        break;
      case Inputs.Down:
        desiredPos.y++;
        break;
      case Inputs.Left:
        desiredPos.x--;
        break;
      case Inputs.Right:
        desiredPos.x++;
        break;
    }

    // check if desired position is out of bounds
    const outOfBounds = this.checkIfOutOfBounds(desiredPos);
    if (outOfBounds) {
      // TODO: display message to user
      console.log(this.outOfBoundsMsg);
      return elements;
    }

    // check if desired position is occupied
    const blockedPositions = this.getBlockedPositions(elements);
    const isOccupied = this.checkIfPosOccupied(desiredPos, blockedPositions);
    if(isOccupied) {
      // check what occupies the tile and handle each case accordingly
      let occupant = elements.filter(element => {
        const curPos = element?.getPosition()
        if (curPos) {
          return curPos.x === desiredPos.x && curPos.y === desiredPos.y;
        }

        return false;
      })[0] as GameElement;

      switch (occupant?.type) {
        case ElementType.Enemy:
          // prevent enemies stacking in same tile
          if (myType === ElementType.Enemy) {
            console.log('can\'t move, to', desiredPos, 'occupied by enemy');
            return elements;
          }
          // TODO: init combat
          console.log('🔪 fighting', occupant.name, 'at', desiredPos, 'and won 🔪🩸');

          // remove defeated enemy from elements 
          function enemyTypeGuard(element: GameElement): element is Enemy {
            return (element as Enemy).id !== undefined;
          }

          elements = elements.filter(element => {
            if (enemyTypeGuard(element) && enemyTypeGuard(occupant)) {
              return element.id !== occupant.id; // remove only the defeated enemy
            }
            return true; // keep all non-enemy elements
          });
          break;
        case ElementType.Item:
          // TODO: pick up item
          console.log('can move, to', desiredPos, 'occupied by item');
          return elements;
        case ElementType.Obstruction:
          // cant move 
          if(myType === ElementType.Player) {
            // TODO: display message to player
          }
          console.log('can\'t move, to', desiredPos, 'occupied by Obstruction');
          return elements;
        case ElementType.Player:
          // ? how do i want to handle if enemy wants to move into player
          return elements;
        case ElementType.Exit:
          if(myType === ElementType.Enemy) {
            console.log('enemy can\'t move, to', desiredPos, 'occupied by exit');
            return elements;
          }
          console.log('player reached the exit at', desiredPos, 'thus completing the stage 🎉');
          elements = elements.filter(element => element?.type === ElementType.Player);
          break;
        default:
          // case that would go here is ElementType.Empty or undefined?
          return elements;
      }
    }

    // if move is valid and tile is not occupied move the entity
    this.x = desiredPos.x;
    this.y = desiredPos.y;
    
    return elements;      
  }

  checkIfOutOfBounds(desiredPos: Position): boolean {
    const outOfBounds = desiredPos.x < 0 || desiredPos.x > this.mapWidth - 1 || desiredPos.y < 0 || desiredPos.y > this.mapHeight - 1;
    return outOfBounds;
  }	

  checkIfPosOccupied(desiredPos: Position, blockedPositions: Position[]): boolean {
    const occupied = blockedPositions.some(blockedPos => {
      return blockedPos.x === desiredPos.x && blockedPos.y === desiredPos.y;
    });

    return occupied;
  }

  getBlockedPositions(elements: GameElement[]): Position[] {
    const blockedPositions = elements
      .filter(element => element !== undefined)
      .map(element => element?.getPosition()) as Position[];
    return blockedPositions;
  }
}
