import { Injectable } from '@angular/core';

import  { BehaviorSubject } from 'rxjs';

import { Player } from './classes/Player';
import { Enemy } from './classes/Enemy';
import { GameElement } from './interfaces/GameElement';


@Injectable({
  providedIn: 'root'
})
export class CombatService {
  private playerSource = new BehaviorSubject<Player | null>(null);
  private enemySource = new BehaviorSubject<Enemy | null>(null);
  private gameElementsSource = new BehaviorSubject<GameElement[]>([]);
  player = this.playerSource.asObservable();
  enemy = this.enemySource.asObservable();
  gameElements = this.gameElementsSource.asObservable();


  constructor() { }

  setPlayer(player: Player) {
    this.playerSource.next(player);
  }

  setEnemy(enemy: Enemy | undefined) {
    if(enemy) {
      this.enemySource.next(enemy);
    }
  }

  setGameElements(gameElements: GameElement[]) {
    this.gameElementsSource.next(gameElements);
  }

  getPlayer(): Player | null {
    return this.playerSource.getValue();
  }

  getEnemy(): Enemy | null {
    return this.enemySource.getValue();
  }

  getGameElements(): GameElement[] {
    return this.gameElementsSource.getValue();
  }
}
