import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';
import { CombatService } from '../combat.service';
import { Enemy } from '../classes/Enemy';
import { Player } from '../classes/Player';


@Component({
  selector: 'app-game-combat',
  templateUrl: './game-combat.component.html',
  styleUrls: ['./game-combat.component.css']
})
export class GameCombatComponent implements OnInit {
  player!: Player;
  enemy!: Enemy;
  playerHealthBarPercent = 0;
  enemyHealthBarPercent = 0;
  combatLog: string[] = ['You encounter a wild forest zombie!',];
  
  constructor(
    private router: Router,
    private combatService: CombatService,
  ) { }

  ngOnInit(): void {
    this.combatService.player.subscribe(player => {
      if (player) {
        this.player = player as Player;
        this.playerHealthBarPercent = this.calcPercentage(this.player.currentHealth, this.player.maxHealth);
      }
    });

    this.combatService.enemy.subscribe(enemy => {
      if (enemy) {
        this.enemy = enemy as Enemy
        this.enemyHealthBarPercent = this.calcPercentage(this.enemy.currentHealth, this.enemy.maxHealth);
      }
    });
  }

  calcPercentage(health: number, maxHealth: number): number {
    return (health / maxHealth) * 100;
  }

  onPlayerAttacks(): void {
    const calculatedDmg = this.player.attack(this.enemy);
    if (calculatedDmg === 0) {
      this.combatLog.push(`You miss the ${this.enemy.name}!`);
      return;
    }
    this.combatLog.push(`You attack the ${this.enemy.name} for ${calculatedDmg} damage!`);

    if(this.enemy.currentHealth <= 0) {
      this.combatLog.push(`You have defeated the ${this.enemy.name}!`);
      // TODO: Add logic to handle enemy death
    }
    this.updateEnemyHealthBar();

    // handle enemy death
    if (this.enemy.isDead()) {
      this.combatLog.push(`You have defeated the ${this.enemy.name}!`);
      // TODO: Add logic to handle enemy death (loot, exp, etc.)
      // for now just go back to game level
      this.goToGameLevel();
    }
  }

  onPlayerStealsHealth(): void {
    const calculatedStolenHp = this.player.attack(this.enemy);
    if (calculatedStolenHp === 0) {
      this.combatLog.push(`You miss the ${this.enemy.name}!`);
      return;
    }
    this.player.heal(calculatedStolenHp);
    this.updatePlayerHealthBar();
    this.updateEnemyHealthBar();
    this.combatLog.push(`You steal ${calculatedStolenHp} HP from ${this.enemy.name}!`);
  }
  
  onEnemyAttacks(): void {
    const calculatedDmg = this.enemy.attack(this.player);
    if (calculatedDmg === 0) {
      this.combatLog.push(`The ${this.enemy.name} misses you!`);
      return;
    }
    this.combatLog.push(`The ${this.enemy.name} attacks you for ${calculatedDmg} damage!`);
    
    this.updatePlayerHealthBar();

    // handle player death
    if (this.player.isDead()) {
      this.combatLog.push(`You have been defeated by ${this.enemy.name}!`)
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
    this.playerHealthBarPercent = this.calcPercentage(this.player.currentHealth, this.player.maxHealth);
  }
  
  updateEnemyHealthBar(): void {
    this.enemyHealthBarPercent = this.calcPercentage(this.enemy.currentHealth, this.enemy.maxHealth);
  }
}
