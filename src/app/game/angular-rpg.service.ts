import { Injectable } from '@angular/core';
import { AngularRpg } from './classes/AngularRpg';

@Injectable({
  providedIn: 'root'
})
export class AngularRpgService {
  private angularRpg!: AngularRpg;
  constructor() { }
  
  setAngularRpg(angularRpg: AngularRpg) {
    this.angularRpg = angularRpg;
  }

  getAngularRpg(): AngularRpg {
    return this.angularRpg;
  }
}
