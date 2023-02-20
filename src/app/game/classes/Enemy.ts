import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { Inputs } from '../enums/Inputs';
import { ElementType } from '../enums/ElementType';
import { Grid } from './Grid';
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
    switch (direction) {
      case 0:
        this.move(Inputs.Down, elements);
        break;
      case 1:
        this.move(Inputs.Up, elements);
        break;
      case 2:
        this.move(Inputs.Left, elements);
        break;
      case 3:
        this.move(Inputs.Right, elements);
        break;
      default:
        this.move(Inputs.None, elements);
    }
  }
}