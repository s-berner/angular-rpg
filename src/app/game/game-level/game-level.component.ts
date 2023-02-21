import { Component, HostListener, OnInit, Output} from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
import { Enemy } from '../classes/Enemy';
import { Player } from '../classes/Player';
import { Inputs } from '../enums/Inputs';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  game!: AngularRpg;
  @Output()htmlGrid: string[][] = [];
  
  ngOnInit(): void {
    this.game = new AngularRpg('🧙', 10, 10);
    this.htmlGrid = this.game.getFormattedGrid();
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent): void {
    switch(event.key) {
      case 'w':
        this.game.handlePlayerInput(Inputs.Up);
        break;
      case 'ArrowUp':
        this.game.handlePlayerInput(Inputs.Up);
        break;
      case 'a':
        this.game.handlePlayerInput(Inputs.Left);
        break;
      case 'ArrowLeft':
        this.game.handlePlayerInput(Inputs.Left);
        break;
      case 's':
        this.game.handlePlayerInput(Inputs.Down);
        break;
      case 'ArrowDown':
        this.game.handlePlayerInput(Inputs.Down);
        break;
      case 'd':
        this.game.handlePlayerInput(Inputs.Right);
        break;
      case 'ArrowRight':
        this.game.handlePlayerInput(Inputs.Right);
        break;
    }
  
    // TODO: make enemys move after player moves

    this.htmlGrid = this.game.getFormattedGrid();
  }
}
