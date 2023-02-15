import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameLevelComponent } from './game-level/game-level.component';
import { GameCombatComponent } from './game-combat/game-combat.component';
import { GameRoutingModule } from './game-routing.module';



@NgModule({
  declarations: [
    GameLevelComponent,
    GameCombatComponent
  ],
  imports: [
    CommonModule,
    GameRoutingModule
  ]
})
export class GameModule { }
