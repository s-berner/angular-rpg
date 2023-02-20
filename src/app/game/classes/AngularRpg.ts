import { Grid } from "./Grid";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Inputs } from "../enums/Inputs";
import { GameElement } from "../interfaces/GameElement";
import { Item } from "../interfaces/Item";
import { Position } from "../interfaces/Position";

export class AngularRpg {
  player: Player;
  currentStage = 3;
  elements: GameElement[] = [];
  grid: Grid;
      
  constructor(
    playName: string, 
    height?: number, 
    width?: number) {
      this.player = new Player(playName, 2, 2);
      this.grid = new Grid(height || 10, width || 10);
      this.generateEntites();
  }

  movePlayer(direction: Inputs): void {
    this.player.move(direction);
  }

  initStage(): void {
    this.generateEntites();
  }

  getFormattedGrid(): string[][] {
    this.populateGrid();
    return this.grid.formatGrid();
  }

  generateEntites(): void {
    // Clear game elements
    this.elements = []; 
        
    // Add player
    this.elements.push(this.player);
        
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
    
    const blockedPositions: Position[] = [];
    this.elements.forEach(element => {
      if (element instanceof Player) {
        blockedPositions.push(element.getPosition());
      }
    });
  
    for (let i = 0; i < amount; i++) {
      const position = this.generateRandomPosition();
      const enemy = new Enemy('enemy' + i, position.x, position.y);
      enemies.push(enemy);
    }
    return enemies;
  }


  populateGrid(): void {
    this.grid.initGrid(this.grid.width, this.grid.height);
    this.elements.forEach(element => {
      if (element instanceof Player || element instanceof Enemy) {
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