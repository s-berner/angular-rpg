import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatButton } from '@angular/material/button';


@Component({
  selector: 'app-game-combat',
  templateUrl: './game-combat.component.html',
  styleUrls: ['./game-combat.component.css']
})
export class GameCombatComponent implements OnInit {
  player!: any;
  enemy!: any;
  playerHP = 0;
  enemyHP = 0;
  combatLog: string[] = ['You encounter a wild forest zombie!',];
  
  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.player = JSON.parse(params['player']);
      this.enemy = JSON.parse(params['enemy']);
      this.playerHP = this.calcPercentage(Number(this.player.currentHealth), Number(this.player.maxHealth));
      this.enemyHP = this.calcPercentage(Number(this.enemy.currentHealth), Number(this.enemy.maxHealth));
    });
  }

  calcPercentage(health: number, maxHealth: number): number {
    return (health / maxHealth) * 100;
  }

  stealHp(amount: number): void {
    this.enemyHP -= amount;
    this.playerHP += amount;
    this.combatLog.push('You steal ' + amount + ' health from the enemy!');
  }

  attack(amount: number): void {
    this.enemyHP -= amount;
    this.combatLog.push('You attack the enemy for ' + amount + ' damage!');
  }

  takeDmg(amount: number): void {
    this.playerHP -= amount;
    this.combatLog.push('You take ' + amount + ' damage!');
  }

}
