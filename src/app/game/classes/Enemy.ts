import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { Inputs } from '../enums/Inputs';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';

export class Enemy extends MoveableEntity {
  maxHealth = 10;
  currentHealth = this.maxHealth;
  attributes = { strength: 5, armor: 10, agility: 10 };
  inventory: Item[] = [];
  type: ElementType = ElementType.Enemy;
  
  constructor (
    public name: string,
    x: number,
    y: number,
  ) { super(x, y); }
    
  randomMove(elements: GameElement[]): void {
    const direction = Math.floor(Math.random() * 4);
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
    this.move(input, elements, this.type);
  }
}