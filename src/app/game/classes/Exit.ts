import { ElementType } from "../enums/ElementType";
import { Position } from "../interfaces/Position";

export class Exit {
  readonly type = ElementType.Exit;
  readonly display = '🕳️';
  readonly stageCompletedExp: number;

  constructor (
    readonly goToStage: number,
    readonly x: number,
    readonly y: number,
  ) {
    this.stageCompletedExp = this.initGainExp(goToStage);
  }

  getPosition(): Position {
    return { x: this.x, y: this.y };
  }

  initGainExp(stage: number): number {
    return stage * 10;
  }
}
