import { MoveableEntity } from './MovableEntity';
import { Combatant } from '../interfaces/Combatant';
import { Item } from './Item';
import { Inputs } from '../enums/Inputs';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';
import { Position } from '../interfaces/Position';

export class Enemy extends MoveableEntity implements Combatant {
  maxHealth = 10;
  currentHealth = this.maxHealth;
  attributes = { strength: 10, armor: 3, evasion: 0.1 };
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
    const currentPos = this.getPosition();
    const targetNotSet = this.target === undefined;
    const arrivedAtTarget = this.target && this.target.x === currentPos.x && this.target.y === currentPos.y;
    if (targetNotSet || arrivedAtTarget) {
      this.target = this.findTarget(elements);
      this.path = this.findPathToTarget(this.target, this.getBlockedPositions(elements));
    }

    // walk along path
    if (this.path && this.path.length > 0) {
      const nextStep = this.path.shift();
      if (nextStep) {
        this.move(nextStep, elements, this.type);
      }
    }
  }

  attack(target: Combatant): number {
    // check if attack hits
    const miss = !(Math.random() > target.attributes.evasion);
    if (miss) {
      return 0;
    }
    const damage = this.attributes.strength - target.attributes.armor;
    target.currentHealth -= damage;
    
    return damage;
  }

  takeDamage(damage: number): void {
    this.currentHealth -= damage;
  }

  heal(amount: number): void {
    this.currentHealth += amount;
    // prevent overhealing
    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  }

  isDead(): boolean {
    return this.currentHealth <= 0;
  }
}