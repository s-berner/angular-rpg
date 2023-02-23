import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectionStrategy, ChangeDetectorRef, DoCheck } from '@angular/core';
import { ElementType } from '../enums/ElementType';
import { GameElement } from '../interfaces/GameElement';
import { Tile } from '../classes/Tile';
@Component({
  selector: 'app-game-grid',
  templateUrl: './game-grid.component.html',
  styleUrls: ['./game-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GameGridComponent implements OnInit, OnChanges {
  @Input() gridWidth: number = 0;
  @Input() gridHeight: number = 0;
  @Input() gameElements: GameElement[] = [];
  grid: Tile[][] = [];
  type = ElementType; // set type to use enum in the template
  gridAlive: boolean = false;

  constructor(
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('ngOnInit')
    this.inizializeGrid();
    this.gridAlive = true;
    this.placeGameElements();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges:', changes);
    if (this.gridAlive) {
      this.placeGameElements();
      this.changeDetector.detectChanges();
    }
  }

  inizializeGrid(): void {
    for (let y = 0; y < this.gridWidth; y++) {
      let row: Tile[] = [];
      for (let x = 0; x < this.gridHeight; x++) {
        row.push(new Tile(x, y));
      }
      this.grid.push(row);
    }
  }

  placeGameElements(): void {
    if (this.gameElements) {
      console.log('gameElements', this.gameElements);
      this.gameElements.forEach((element: GameElement) => {
        if (element) {
          console.log('position of element', element.getPosition());
          const elPos = element.getPosition();
          this.grid[elPos.y][elPos.x].occupant = element;
        }
      });
    }
  }
}
