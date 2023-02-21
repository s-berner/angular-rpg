import { Component, HostListener, OnInit, Output } from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
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
        this.game.operateGame(Inputs.Up);
        break;
      case 'ArrowUp':
        this.game.operateGame(Inputs.Up);
        break;
      case 'a':
        this.game.operateGame(Inputs.Left);
        break;
      case 'ArrowLeft':
        this.game.operateGame(Inputs.Left);
        break;
      case 's':
        this.game.operateGame(Inputs.Down);
        break;
      case 'ArrowDown':
        this.game.operateGame(Inputs.Down);
        break;
      case 'd':
        this.game.operateGame(Inputs.Right);
        break;
      case 'ArrowRight':
        this.game.operateGame(Inputs.Right);
        break;
    }
  
    // TODO: make enemys move after player moves

    this.htmlGrid = this.game.getFormattedGrid();
  }
}
