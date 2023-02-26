import { Component, OnInit} from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
import { SharedDataService } from '../../shared-data.service';
import { AngularRpgService } from '../angular-rpg.service';

@Component({
  selector: 'app-game-view',
  templateUrl: './game-view.component.html',
  styleUrls: ['./game-view.component.css']
})
export class GameViewComponent implements OnInit {
  playerName: string = '';
  angularRpg: AngularRpg = new AngularRpg('', 10, 10);

  constructor(
    private sharedDataService: SharedDataService,
    private angularRpgService: AngularRpgService) { }

  ngOnInit(): void {
    console.log('ngOnInit called in game-view.component.ts');
    this.playerName = this.sharedDataService.getPlayerName();
    this.angularRpg = new AngularRpg(this.playerName, 10, 10);
    this.angularRpgService.setAngularRpg(this.angularRpg);
  }
}
