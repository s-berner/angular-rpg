import { Component } from '@angular/core';
import { SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-welcome-screen',
  templateUrl: './welcome-screen.component.html',
  styleUrls: ['./welcome-screen.component.css']
})
export class WelcomeScreenComponent {
  playerName = '';
  constructor(private sharedDataService: SharedDataService) { }

  onStartJourneyClicked() {
    this.sharedDataService.setPlayerName(this.playerName);
  }
}
