import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-game-message-log',
  templateUrl: './game-message-log.component.html',
  styleUrls: ['./game-message-log.component.css']
})
export class GameMessageLogComponent {
  @Input() title = '';
  @Input() messages: string[] = [];
}
