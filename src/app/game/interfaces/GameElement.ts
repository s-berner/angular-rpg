import { Player } from '../classes/Player';
import { Enemy } from '../classes/Enemy';
import { Item } from '../classes/Item';
import { Exit } from '../classes/Exit';

export type GameElement = Player | Enemy | Item | Exit | undefined;