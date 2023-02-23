import { Component, HostListener, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
import { Inputs } from '../enums/Inputs';
import { GameElement } from '../interfaces/GameElement';
import { GameGridComponent } from '../game-grid/game-grid.component';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit, OnChanges {
  AngularRpg!: AngularRpg;
  gameElements: GameElement[] = [];
  gridWidth: number = 0;
  gridHeight: number = 0;
  
  ngOnInit(): void {
    this.AngularRpg = new AngularRpg('🧙', 10, 10);
    this.gameElements = this.AngularRpg.elements;
    this.gridWidth = this.AngularRpg.width;
    this.gridHeight = this.AngularRpg.height;
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges in game-level.component.ts');
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent): void {
    let updatedElements: GameElement[] = [];
    switch(event.key) {
      case 'w':
        case 'ArrowUp':
        updatedElements = this.AngularRpg.operateGame(Inputs.Up);
        break;
        case 'a':
          case 'ArrowLeft':
        updatedElements = this.AngularRpg.operateGame(Inputs.Left);
        break;
        case 's':
      case 'ArrowDown':
        updatedElements = this.AngularRpg.operateGame(Inputs.Down);
        break;
      case 'd':
      case 'ArrowRight':
        updatedElements = this.AngularRpg.operateGame(Inputs.Right);
        break;
      }

      
      let newElementsArray: GameElement[] = [];
      updatedElements.forEach((element: GameElement) => {
        newElementsArray.push(element);
      });

      this.gameElements = newElementsArray ;
  }
}
