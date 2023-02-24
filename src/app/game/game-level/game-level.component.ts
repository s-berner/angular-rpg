import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';
import { AngularRpg } from '../classes/AngularRpg';
import { Inputs } from '../enums/Inputs';
import { GameElement } from '../interfaces/GameElement';
import { Enemy } from '../classes/Enemy';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  angularRpg!: AngularRpg;
  gameElements: GameElement[] = [];
  gridWidth: number = 0;
  gridHeight: number = 0;

  constructor(private router: Router) { }
  
  ngOnInit(): void {
    this.angularRpg = new AngularRpg('🧙', 10, 10);
    this.gameElements = this.angularRpg.elements;
    this.gridWidth = this.angularRpg.width;
    this.gridHeight = this.angularRpg.height;
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent): void {
    switch(event.key) {
      case 'w':
      case 'ArrowUp':
        this.gameElements = this.angularRpg.operateGame(Inputs.Up);
        break;
      case 'a':
      case 'ArrowLeft':
        this.gameElements = this.angularRpg.operateGame(Inputs.Left);
        break;
      case 's':
      case 'ArrowDown':
        this.gameElements = this.angularRpg.operateGame(Inputs.Down);
        break;
      case 'd':
      case 'ArrowRight':
        this.gameElements = this.angularRpg.operateGame(Inputs.Right);
        break;
    }

    if(this.angularRpg.player.initiateCombat) {
      this.goToCombat();
      this.angularRpg.player.initiateCombat = false;
    }

    let newElementsArray: GameElement[] = [];
    this.gameElements.forEach((element: GameElement) => {
      newElementsArray.push(element);
    });
    this.gameElements = newElementsArray;
  }

  goToCombat(): void {
    const dataToPass = {
      player: JSON.stringify(this.angularRpg.player),
      enemy: JSON.stringify(this.angularRpg.opponent),
    };

    this.router.navigate(['/game/combat'], {queryParams: dataToPass});
  }
}
