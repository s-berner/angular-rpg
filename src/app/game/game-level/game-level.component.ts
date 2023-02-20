import { Component, HostListener, OnInit, Output} from '@angular/core';
import { AngularRpg } from '../classes/AngularRpg';
import { Enemy } from '../classes/Enemy';
import { Player } from '../classes/Player';
import { GameElement } from '../interfaces/GameElement';

@Component({
  selector: 'app-game-level',
  templateUrl: './game-level.component.html',
  styleUrls: ['./game-level.component.css']
})
export class GameLevelComponent implements OnInit {
  game!: AngularRpg;
  @Output()htmlGrid: string[][] = [];
  
  ngOnInit(): void {
    this.initHtmlGrid();
    this.drawGame();
  }

  drawGame(): void {
    this.game = new AngularRpg('dude');
    this.game.elements.forEach(object => {
      if (object instanceof Player || object instanceof Enemy) {
        const position = object.getPosition();
        if (object instanceof Player) {
          console.log('player exits at: ' + position.x + ', ' + position.y);
          this.htmlGrid[position.y][position.x] = object.name;
        } else {
          console.log('enemy exits at: ' + position.x + ', ' + position.y);
          this.htmlGrid[position.y][position.x] = 'placeholder';
        }
      }
    });
  }

  redrawGame(): void {
    this.game.elements.forEach(object => {
      if (object instanceof Player || object instanceof Enemy) {
        const position = object.getPosition();
        if (object instanceof Player) {
          console.log('player exits at: ' + position.x + ', ' + position.y);
          this.htmlGrid[position.y][position.x] = object.name;
        } else {
          console.log('enemy exits at: ' + position.x + ', ' + position.y);
          this.htmlGrid[position.y][position.x] = 'E';
        }
      }
    });
  }

  initHtmlGrid(): void {
    for (let i = 0; i < 10; i++) {
      this.htmlGrid[i] = [];
      for (let j = 0; j < 10; j++) {
        this.htmlGrid[i][j] = '';
      }
    }
  }

  @HostListener('window:keydown', ['$event'])
  onKeypress(event: KeyboardEvent) {
    switch(event.key) {
      case 'w':
        // move player up
        console.log('w pressed');
        this.movePlayer('up');
        break;
      case 'ArrowUp':
        // move player up
        console.log('arrowup pressed');
        this.movePlayer('up');
        break;
      case 'a':
        // move player left
        console.log('a pressed');
        this.movePlayer('left');
        break;
      case 'ArrowLeft':
        // move player left
        console.log('arrowleft pressed');
        this.movePlayer('left');
        break;
      case 's':
        // move player down
        console.log('s pressed');
        this.movePlayer('down');
        break;
      case 'ArrowDown':
        // move player down
        console.log('arrowdown pressed');
        this.movePlayer('down');
        break;
      case 'd':
        // move player right
        console.log('d pressed');
        this.movePlayer('right');
        break;
      case 'ArrowRight':
        // move player right
        console.log('arrowright pressed');
        this.movePlayer('right');
        break;
    }
  
    // TODO: make enemys move after player moves

    // updateGame
    this.redrawGame();
  }

  movePlayer(direction: string): void {
    this.game.elements.forEach(object => {
      if (object instanceof Player) {
        const prevPosition = object.getPosition();
        try {
          object.move(direction);
        } catch (error) {
          console.error(error)
          return;
        } finally {
          this.htmlGrid[prevPosition.y][prevPosition.x] = '';
        }
      }
    });
  }
}
