import { Component, HostListener, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { AngularRpg } from '../classes/AngularRpg';
import { GameElement } from '../interfaces/GameElement';
import { Inputs } from '../enums/Inputs';
import { CombatService } from '../combat.service';
import { AngularRpgService } from '../angular-rpg.service';
import { Player } from '../classes/Player';
import { Enemy } from '../classes/Enemy';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  angularRpg!: AngularRpg;
  gameElements: GameElement[] = [];

  constructor(
    private router: Router,
    private combatService: CombatService,
    private angularRpgService: AngularRpgService
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit() called in game-level.component.ts');
    this.angularRpg = this.angularRpgService.getAngularRpg();
    const player = this.combatService.getPlayer();
    if (player) {
      this.angularRpg.player = player;
    }
    this.gameElements = this.angularRpg.elements;
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

    if(this.angularRpg.opponent) {
      console.log('opponent found');
      this.goToCombat(this.angularRpg.player, this.angularRpg.opponent);
      this.angularRpg.opponent = undefined;
    }

    // this forces the view to update
    let newElementsArray: GameElement[] = [];
    this.gameElements.forEach((element: GameElement) => {
      newElementsArray.push(element);
    });
    this.gameElements = newElementsArray;
  }

  goToCombat(player: Player, opponent: Enemy): void {
    this.combatService.setPlayer(player);
    this.combatService.setEnemy(opponent);
    this.router.navigate(['/game/combat']);
  }
}
