import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { GameLevelComponent } from './game-level/game-level.component';
import { GameCombatComponent } from './game-combat/game-combat.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GameGridComponent } from './game-grid/game-grid.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import {MatListModule} from '@angular/material/list';

@NgModule({
  declarations: [
    GameLevelComponent,
    GameCombatComponent,
    GameViewComponent,
    GameGridComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule,
  ]
})
export class GameModule { }
