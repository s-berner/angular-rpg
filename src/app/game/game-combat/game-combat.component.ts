import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';

import { Subscription } from 'rxjs';

import { CombatService } from '../combat.service';
import { Enemy } from '../classes/Enemy';
import { Player } from '../classes/Player';


@Component({
  selector: 'app-game-combat',
  templateUrl: './game-combat.component.html',
  styleUrls: ['./game-combat.component.css']
})
export class GameCombatComponent implements OnInit, OnDestroy {
  playerSubscription?: Subscription;
  enemySubscription?: Subscription;
  player?: Player;
  enemy?: Enemy;
  playerHealthBarPercent = 0;
  enemyHealthBarPercent = 0;
  combatLog: string[] = ['You encounter a wild forest zombie!',];

  constructor(
    private router: Router,
    private combatService: CombatService,
  ) { }

  ngOnInit(): void {
    console.log('ngOnInit() called in game-combat.component.ts');
    this.playerSubscription = this.combatService.player.subscribe(player => {
      if (player) {
        this.player = player as Player;
        this.playerHealthBarPercent = this.calcPercentage(this.player.currentHealth, this.player.maxHealth);
      }
    });

    this.enemySubscription = this.combatService.enemy.subscribe(enemy => {
      if (enemy) {
        this.enemy = enemy as Enemy
        this.enemyHealthBarPercent = this.calcPercentage(this.enemy.currentHealth, this.enemy.maxHealth);
      }
    });

  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy() called in game-combat.component.ts');
    if (this.playerSubscription) {
      this.playerSubscription.unsubscribe();
    }
    if (this.enemySubscription) {
      this.enemySubscription.unsubscribe();
      this.combatService.clearEnemy();
    }
  }

  calcPercentage(health: number, maxHealth: number): number {
    return (health / maxHealth) * 100;
  }

  onPlayerAttacks(): void {
    if (!this.player || !this.enemy) {
      return;
    }

    const calculatedDmg = this.player.attack(this.enemy);
    if (calculatedDmg === 0) {
      this.combatLog.push(`You miss the ${this.enemy.display}!`);
      return this.onEnemyAttacks();
    }
    this.updateEnemyHealthBar();
    this.combatLog.push(`You attack the ${this.enemy.display} for ${calculatedDmg} damage!`);

    // handle enemy death
    if (this.checkIfEnemyIsDead()) {
      this.combatLog.push(`You have defeated the ${this.enemy.display}!`);
      /*
        TODO: Add logic to handle enemy death (loot, exp, etc.)
        for now just go back to game-level
      */
      return this.goToGameLevel();
    }

    // enemys turn
    return this.onEnemyAttacks();
  }

  onPlayerStealsHealth(): void {
    if (!this.player || !this.enemy) {
      return;
    }

    const calculatedStolenHp = this.player.attack(this.enemy);
    if (calculatedStolenHp === 0) {
      this.combatLog.push(`You miss the ${this.enemy.display}!`);
      return this.onEnemyAttacks();
    }
    this.player.heal(calculatedStolenHp);
    this.updatePlayerHealthBar();
    this.updateEnemyHealthBar();
    this.combatLog.push(`You steal ${calculatedStolenHp} HP from ${this.enemy.display}!`);

    // handle enemy death
    if (this.checkIfEnemyIsDead()) {
      this.combatLog.push(`You have defeated the ${this.enemy.display}!`);
      //TODO: Add logic to handle enemy death (loot, exp, etc.)
      // for now just go back to game level
      return this.goToGameLevel();
    }

    // enemys turn
    return this.onEnemyAttacks();
  }

  onEnemyAttacks(): void {
    if (!this.player || !this.enemy) {
      return;
    }

    const calculatedDmg = this.enemy.attack(this.player);
    if (calculatedDmg === 0) {
      this.combatLog.push(`The ${this.enemy.display} misses you!`);
      return;
    }
    this.combatLog.push(`The ${this.enemy.display} attacks you for ${calculatedDmg} damage!`);

    this.updatePlayerHealthBar();

    // handle player death
    if (this.checkIfPlayerIsDead()) {
      this.combatLog.push(`You have been defeated by ${this.enemy.display}!`)
      // TODO: Add logic to handle player death
    }
  }

  onPlayerFlees(): void {
    // TODO: Add logic to handle player fleeing
  }

  onItemUsed(): void {
    // TODO: Add logic to handle item use
  }

  goToGameLevel(): void {
    this.router.navigate(['/game/level']);
  }

  goToWelcome(): void {
    this.router.navigate(['/']);
  }

  updatePlayerHealthBar(): void {
    if (!this.player || !this.enemy) {
      return;
    }

    this.playerHealthBarPercent = this.calcPercentage(this.player.currentHealth, this.player.maxHealth);
  }

  updateEnemyHealthBar(): void {
    if (!this.player || !this.enemy) {
      return;
    }
    this.enemyHealthBarPercent = this.calcPercentage(this.enemy.currentHealth, this.enemy.maxHealth);
  }

  checkIfPlayerIsDead(): boolean {
    if (!this.player || !this.enemy) {
      return true;
    }

    return this.player.isDead();
  }

  checkIfEnemyIsDead(): boolean {
    if (!this.player || !this.enemy) {
      return true;
    }

    return this.enemy.isDead();
  }

  onReset(): void {
    this.router.navigate(['/game/level']);
  }
}
