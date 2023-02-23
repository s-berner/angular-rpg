import { Component, HostListener, OnInit, Output } from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
import { Inputs } from '../enums/Inputs';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  AngularRpg!: AngularRpg;
  @Output()htmlGrid: string[][] = [];
  
  ngOnInit(): void {
    this.AngularRpg = new AngularRpg('🧙', 10, 10);
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent): void {
    switch(event.key) {
      case 'w':
      case 'ArrowUp':
        this.AngularRpg.operateGame(Inputs.Up);
        break;
      case 'a':
      case 'ArrowLeft':
        this.AngularRpg.operateGame(Inputs.Left);
        break;
      case 's':
      case 'ArrowDown':
        this.AngularRpg.operateGame(Inputs.Down);
        break;
      case 'd':
      case 'ArrowRight':
        this.AngularRpg.operateGame(Inputs.Right);
        break;
    }
  }
}
