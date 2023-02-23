import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { Inputs } from '../enums/Inputs';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';
import { Position } from '../interfaces/Position';

export class Enemy extends MoveableEntity {
  maxHealth = 10;
  currentHealth = this.maxHealth;
  attributes = { strength: 5, armor: 10, agility: 10 };
  inventory: Item[] = [];
  readonly type = ElementType.Enemy;
  private target?: Position;
  private path?: Inputs[];

  constructor (
    readonly id: string,
    public name: string,
    x: number,
    y: number,
  ) { super(x, y); }
    
  randomMove(elements: GameElement[]): void {
    this.walkToTarget(elements);
  /*   const direction = Math.floor(Math.random() * 4);
    let input = Inputs.None;
    switch (direction) {
      case 0:
        input = Inputs.Down;
        break;
      case 1:
        input = Inputs.Up;
        break;
      case 2:
        input = Inputs.Left;
        break;
      case 3:
        input = Inputs.Right;
        break;
      default:
        input = Inputs.None;
    }
    this.move(input, elements, this.type); */
  }

  findPathToTarget(target: Position, blockedPositions: Position[]): Inputs[] {
    const currentPos = this.getPosition();
    const path: Inputs[] = [];
    while(target.x !== currentPos.x || target.y !== currentPos.y) {
      if (target.x > currentPos.x) {
        path.push(Inputs.Right);
        currentPos.x++;
      } else if (target.x < currentPos.x) {
        path.push(Inputs.Left);
        currentPos.x--;
      } else if (target.y > currentPos.y) {
        path.push(Inputs.Down);
        currentPos.y++;
      } else if (target.y < currentPos.y) {
        path.push(Inputs.Up);
        currentPos.y--;
      }
    }
    
    return path;
  }

  findTarget(elements: GameElement[]): Position {
    const blockedPositions = this.getBlockedPositions(elements);
    const freePositions = [];
    for (let x = 0; x < this.mapWidth; x++) {
      for (let y = 0; y < this.mapHeight; y++) {
        const pos = { x, y };
        if (!this.checkIfPosOccupied(pos, blockedPositions)) {
          freePositions.push(pos);
        }
      }
    }
    const target = freePositions[Math.floor(Math.random() * freePositions.length)];
    return target;
  }

  walkToTarget(elements: GameElement[]): void {
    /* 
      * if target not set or arrived at target
      * find new target and path 
    */
    const currentPos = this.getPosition();
    const targetNotSet = this.target === undefined;
    const arrivedAtTarget = this.target && this.target.x === currentPos.x && this.target.y === currentPos.y;
    if (targetNotSet || arrivedAtTarget) {
      this.target = this.findTarget(elements);
      this.path = this.findPathToTarget(this.target, this.getBlockedPositions(elements));
    }
    console.log('walking to target', this.target);

    // walk along path
    if (this.path && this.path.length > 0) {
      const nextStep = this.path.shift();
      if (nextStep) {
        this.move(nextStep, elements, this.type);
      }
    }
  }
}