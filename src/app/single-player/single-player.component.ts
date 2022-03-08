import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent {
  caselle:{mostra:boolean, testo:string, bckColor:string}[] = [];

  constructor(public settings:Settings) {
    for (let i = 0; i < 12; i++) {
      for (let ii = 0; ii < 12; ii++) {
        if (i < 3 && ii < 3)
          this.caselle.push({mostra:true, testo:"-", bckColor:""});
        else
          this.caselle.push({mostra:false, testo:"-", bckColor:""});
      }
    }
  }

  click(id:number) {
    /* if(vinto) {
        this.settings.aumentoLvl();
        if (this.settings.livello < 11) this.mostraCaselle();
      }
    */
  }

  mostraCaselle() {
    for (let i = 0; i < 12; i++) {
      for (let ii = i * 12; ii < (i + 1) * 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (i*12 + (this.settings.livello + 2))) {
          this.caselle[ii].mostra = true;
        }
      }
    }
  }
}