import { GameElement } from "../interfaces/GameElement";
import { Player } from "./Player";
import { Enemy } from "./Enemy";

export class Grid  {
  grid: GameElement[][] = [];
  
  constructor(
    readonly height: number, 
    readonly width: number) {
      this.initGrid(this.width, this.height);
  }
    
  initGrid(width: number, height: number): void {
    for (let i = 0; i < height; i++) {
      this.grid[i] = [];
      for (let j = 0; j < width; j++) {
        this.grid[i][j] = '';
      }
    }
  }

  formatGrid(): string[][] {
    const formattedGrid: string[][] = this.grid.map(row => {
      return row.map(cell => {
        if (cell instanceof Player) {
          return cell.name;
        } else if (cell instanceof Enemy) {
          return cell.name;
        } else {
          return '';
        }
      });
    });
    
    return formattedGrid;
  }

  getTile(x: number, y: number): GameElement {
    return this.grid[y][x];
  }

  tileIsBlocked(x: number, y: number): boolean {
    return this.grid[y][x] !== '';
  }
}
