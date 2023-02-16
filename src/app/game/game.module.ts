import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { GameLevelComponent } from './game-level/game-level.component';
import { GameCombatComponent } from './game-combat/game-combat.component';
import { GameViewComponent } from './game-view/game-view.component';

@NgModule({
  declarations: [
    GameLevelComponent,
    GameCombatComponent,
    GameViewComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ]
})
export class GameModule { }
