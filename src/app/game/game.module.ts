import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { GameLevelComponent } from './game-level/game-level.component';
import { GameCombatComponent } from './game-combat/game-combat.component';
import { GameViewComponent } from './game-view/game-view.component';
import { GameGridComponent } from './game-grid/game-grid.component';

import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { CombatViewCardComponent } from './combat-view-card/combat-view-card.component';
import { EnemyNamePipe } from './enemy-name.pipe';

@NgModule({
  declarations: [
    GameLevelComponent,
    GameCombatComponent,
    GameViewComponent,
    GameGridComponent,
    DialogComponent,
    CombatViewCardComponent,
    EnemyNamePipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule,
  ],
  providers: [
    EnemyNamePipe,
  ],
})
export class GameModule { }
