import { MoveableEntity } from './MovableEntity';
import { Item } from './Item';
import { ElementType } from '../enums/ElementType';

export class Player extends MoveableEntity {
  level = 1;
  experience = 0;
  maxHealth = 10;
  currentHealth = this.maxHealth;
  attributes = { strength: 5, armor: 10, agility: 10 };
  inventory: Item[] = [];
  readonly type = ElementType.Player;

  constructor (
    public name: string,
    x: number,
    y: number,
  ) { super(x, y); }
}
