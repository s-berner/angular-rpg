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
    this.game = new AngularRpg('dude', 10, 10);
    this.htmlGrid = this.game.getFormattedGrid();
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    switch(event.key) {
      case 'w':
        // move player up
        console.log('w pressed');
        this.game.handlePlayerInput(Inputs.Up);
        break;
      case 'ArrowUp':
        // move player up
        console.log('arrowup pressed');
        this.game.handlePlayerInput(Inputs.Up);
        break;
      case 'a':
        // move player left
        console.log('a pressed');
        this.game.handlePlayerInput(Inputs.Left);
        break;
      case 'ArrowLeft':
        // move player left
        console.log('arrowleft pressed');
        this.game.handlePlayerInput(Inputs.Left);
        break;
      case 's':
        // move player down
        console.log('s pressed');
        this.game.handlePlayerInput(Inputs.Down);
        break;
      case 'ArrowDown':
        // move player down
        console.log('arrowdown pressed');
        this.game.handlePlayerInput(Inputs.Down);
        break;
      case 'd':
        // move player right
        console.log('d pressed');
        this.game.handlePlayerInput(Inputs.Right);
        break;
      case 'ArrowRight':
        // move player right
        console.log('arrowright pressed');
        this.game.handlePlayerInput(Inputs.Right);
        break;
    }
  
    // TODO: make enemys move after player moves

    this.htmlGrid = this.game.getFormattedGrid();
  }
}
