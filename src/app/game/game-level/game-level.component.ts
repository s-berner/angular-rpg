import { Component, HostListener, OnInit } from '@angular/core';
import { Router, NavigationExtras, NavigationEnd } from '@angular/router';

import { filter, map } from 'rxjs/operators';

import { AngularRpg } from '../classes/AngularRpg';
import { GameElement } from '../interfaces/GameElement';
import { Inputs } from '../enums/Inputs';
import { CombatService } from '../combat.service';
import { AngularRpgService } from '../angular-rpg.service';

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

  constructor(
    private router: Router,
    private combatService: CombatService,
    private angularRpgService: AngularRpgService
  ) { }
  
  ngOnInit(): void {
    this.angularRpg = this.angularRpgService.getAngularRpg();
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
    this.combatService.setPlayer(this.angularRpg.player);
    this.combatService.setEnemy(this.angularRpg.opponent);
    this.router.navigate(['/game/combat']);
  }
}
