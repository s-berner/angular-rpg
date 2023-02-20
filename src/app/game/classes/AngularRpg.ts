import { GameElement } from "../interfaces/GameElement";
import { Player } from "./Player";

export class AngularRpg {
    player: Player;
    stage = 1;
    elements: GameElement[] = [];
    grid: string[][] = [];
      
    constructor(playName: string) {
        this.player = new Player(playName, 2, 2);

        this.generateLevel();
    }

    generateLevel(): void {
        // Clear game elements
        this.elements = []; 
        
        // Add player
        this.elements.push(this.player);
        
        // TODO Generate enemies
        // ...

        // TODO Generate items
        // ...
    }
}