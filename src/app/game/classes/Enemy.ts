import { MoveableEntity } from './MovableEntity';
import { Item } from '../interfaces/Item';

export class Enemy extends MoveableEntity {
  maxHealth = 10;
  currentHealth = this.maxHealth;
  attributes = { strength: 5, armor: 10, agility: 10 };
  inventory: Item[] = [];
  
  constructor (
    public name: string,
    x: number,
    y: number,
  ) { super(x, y); }
    
  randomMove(): void {
    const direction = Math.floor(Math.random() * 4);
    switch (direction) {
      case 0:
        this.move('up');
        break;
      case 1:
        this.move('down');
        break;
      case 2:
        this.move('left');
        break;
      case 3:
        this.move('right');
        break;
    }
  }
}