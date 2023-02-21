import { Grid } from "./Grid";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Inputs } from "../enums/Inputs";
import { GameElement } from "../interfaces/GameElement";
import { Position } from "../interfaces/Position";
import { Exit } from "./Exit";
import { ElementType } from "../enums/ElementType";

export class AngularRpg {
  player: Player;
  grid: Grid;
  currentStage = 3;
  elements: GameElement[] = [];
      
  constructor(
    playerName: string, 
    height?: number, 
    width?: number
  ) {
    // init grid object
    this.grid = new Grid(height || 10, width || 10); // Default grid size is 10x10

    // init player object
    const playerPos = this.generateRandomPosition();
    this.player = new Player(playerName, playerPos.x, playerPos.y);

    // generate Game Elements
    this.generateElements();
  }

  operateGame(direction: Inputs): void {
    // handle the players move
    this.elements = this.player.move(direction, this.elements, ElementType.Player);

    // if the player used the exit
    const exitUsed = !this.elements.some(element => element?.type === ElementType.Exit);

    if(exitUsed) {
      this.currentStage++;
      this.generateElements();
      return;
    }

    // move each enemy
    this.elements.forEach(element => {
      if (element?.type === ElementType.Enemy) {
        const enemy = element as Enemy;
        enemy.randomMove(this.elements);
      }
    });
  }

  initStage(): void {
    this.generateElements();
  }

  getFormattedGrid(): string[][] {
    this.populateGrid();
    return this.grid.formatGrid();
  }

  generateElements(): void {
    // ! player is persistent so they are not generated here
    // Clear game elements
    this.elements = []; 
        
    // Add player
    this.elements.push(this.player);

    // add exit
    const exitPos = this.generateRandomPosition(this.elements.map(element => element?.getPosition()) as Position[]);
    const exit = new Exit(20, this.currentStage + 1, exitPos.x, exitPos.y);
    this.elements.push(exit);

    // Generate enemies
    // ? current stage is used to determine the number of enemies
    // ? i think stage + 1 is a good number
    const enemies = this.generateEnemies(this.currentStage + 1);
    this.elements.push(...enemies);

    // TODO Generate items
    // ...
  }

  generateEnemies(amount: number): Enemy[] {
    const enemies: Enemy[] = [];
    const blockedPositions: Position[] = this.elements.map(element => element?.getPosition()) as Position[];
    for (let i = 0; i < amount; i++) {
      const position = this.generateRandomPosition(blockedPositions);
      blockedPositions.push(position)
      const enemy = new Enemy('🧟' + i, position.x, position.y);
      enemies.push(enemy);
    }
    return enemies;
  }

  populateGrid(): void {
    this.grid.initGrid(this.grid.width, this.grid.height);
    this.elements.forEach(element => {
      if (element?.type) {
        const position = element.getPosition();
        this.grid.grid[position.y][position.x] = element;
      }
    });
  }

  generateRandomPosition(blockedPositions?: Position[]): Position {
    const randomX = Math.floor(Math.random() * this.grid.width);
    const randomY = Math.floor(Math.random() * this.grid.height);
    const position: Position = { x: randomX, y: randomY };
    if (blockedPositions) {
      if (blockedPositions.includes(position)) {
        return this.generateRandomPosition(blockedPositions);
      } else {
        return position;
      }
    } 
    
    return position;
  }
}