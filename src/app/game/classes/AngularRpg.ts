import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Exit } from "./Exit";
import { Obstruction } from "./Obstruction";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Inputs } from "../enums/Inputs";
import { ElementType } from "../enums/ElementType";

export class AngularRpg {
  player: Player;
  opponent?: Enemy | Player;
  currentStage = 0;
  elements: GameElement[] = [];
      
  constructor(
    playerName: string, 
    readonly height: number, 
    readonly width: number
  ) {
    // init player object
    const playerPos = this.genRandomPos();
    this.player = new Player(playerName, playerPos.x, playerPos.y);

    // generate Game Elements
    this.generateElements();
  }

  operateGame(direction: Inputs): GameElement[] {
    // handle the players move  
    this.elements = this.player.move(direction, this.elements, ElementType.Player);

    // check if the player walked into an enemy
    if(this.player.initiateCombat) {
      console.log('go to combat screen')
      this.opponent = this.player.enemy;
    }

    // if the player used the exit
    // TODO: check if the player is on the exit
    const exitUsed = !this.elements.some(element => element?.type === ElementType.Exit);

    if(exitUsed) {
      this.currentStage++;
      this.generateElements();
      return this.elements; // ? maybe issue
    }

    // move each enemy
    this.elements.forEach(element => {
      if (element?.type === ElementType.Enemy) {
        const enemy = element as Enemy;
        enemy.randomMove(this.elements);
      }
    });

    return this.elements;
  }

  initStage(): void {
    this.generateElements();
  }

  clearElements(): void {
    this.elements = [];
  }

  addElements(elements: GameElement[]): void {
    this.elements.push(...elements);
  }

  generateElements(): void {
    // ! player is persistent so they are not generated here
    // Clear game elements
    this.clearElements(); 
        
    // Add player
    this.addElements([this.player]);

    // Generate obstructions
    for (let i = 0; i < 3; i++) {
      this.addElements(this.genObstrCluster(this.elements.map(element => element?.getPosition()) as Position[]));
    }
  
    // add exit
    const exitPos = this.genRandomPos(this.elements.map(element => element?.getPosition()) as Position[]);
    const exit = new Exit(20, this.currentStage + 1, exitPos.x, exitPos.y);
    this.addElements([exit]);

    // Generate enemies
    // ? current stage is used to determine the number of enemies
    // ? i think stage + 1 is a good number
    const enemies = this.genEnemies(this.currentStage + 1);
    this.addElements(enemies);

    // TODO Generate items
    // ...
  }

  genEnemies(amount: number): Enemy[] {
    const enemies: Enemy[] = [];
    const blockedPositions: Position[] = this.elements.map(element => element?.getPosition()) as Position[];
    for (let i = 0; i < amount; i++) {
      const position = this.genRandomPos(blockedPositions);
      blockedPositions.push(position)
      const enemy = new Enemy('e' + i, '🧟', position.x, position.y);
      enemies.push(enemy);
    }
    return enemies;
  }

  genRandomPos(blockedPositions?: Position[]): Position {
    const randomX = Math.floor(Math.random() * this.width);
    const randomY = Math.floor(Math.random() * this.height);
    const position: Position = { x: randomX, y: randomY };
    if (blockedPositions) {
      const positionIsBlocked = blockedPositions.some(blockedPosition => blockedPosition.x === position.x && blockedPosition.y === position.y)
      if (positionIsBlocked) {
        return this.genRandomPos(blockedPositions);
      } else {
        return position;
      }
    } 
    
    return position;
  }

  genObstrCluster(blockedPositions?: Position[]): Obstruction[] {
    // look for cluster of free spaces
    const freeSpaces: Position[] = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const possiblePosition: Position = { x, y };
        const positionBlocked = blockedPositions?.some(position => {
          return position.x === possiblePosition.x && position.y === possiblePosition.y;
        });
        if (positionBlocked) {
          continue;
        }
        freeSpaces.push(possiblePosition);
      }
    }

    // handle no free spaces
    const noFreeSpaces = freeSpaces.length === 0;
    if (noFreeSpaces) {
      return [];
    }

    // pick a random free space
    const randomFreeSpace = freeSpaces[Math.floor(Math.random() * freeSpaces.length)];
    const cluster = [new Obstruction(randomFreeSpace.x, randomFreeSpace.y)];
    const offsetArray = [[-1, 0], [1, 0], [0, -1], [0, 1], [1, 1], [-1, -1], [1, -1], [-1, 1]];
    for (let i = 0; i < 3; i++) {
      const offset = offsetArray[Math.floor(Math.random() * offsetArray.length)];
      const newX = randomFreeSpace.x + offset[0];
      const newY = randomFreeSpace.y + offset[1];
      const newPosition: Position = { x: newX, y: newY };
      if (newX >= 0 && newX < this.width && newY >= 0 && newY < this.height &&
          !blockedPositions?.some(position => position.x === newPosition.x && position.y === newPosition.y)) {
        cluster.push(new Obstruction(newPosition.x, newPosition.y));
      }
    }

    return cluster;
  }
}
