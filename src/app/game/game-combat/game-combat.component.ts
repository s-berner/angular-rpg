import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  test = 100;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.player = JSON.parse(params['player']);
      this.enemy = JSON.parse(params['enemy']);
      this.player.currentHealth = 5;
    });
  }

  attack(dmg: number): void {
    this.test -= dmg;
  }
}
