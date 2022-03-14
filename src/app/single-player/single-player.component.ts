import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent {
  colore:string = "red";
  caselle:{mostra:boolean, testo:string, color:string, bold:string}[] = [];
  valori:{mostra:boolean, testo:string, disable:boolean}[] = [];
  valore:string = "";
  enable:boolean = true;

  constructor(public settings:Settings) {
    for (let i = 0; i < 12; i++) {
      //bottoni
      if (i < (this.settings.livello + 2)) {
        this.valori.push({mostra:false, testo:"" + (i+1), disable:false});
      } else {
        this.valori.push({mostra:true, testo:"" + (i+1), disable:false});
      }

      //caselle
      for (let ii = 0; ii < 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (this.settings.livello + 2))
          this.caselle.push({
            mostra:true,
            testo:"-",
            color:this.settings.coloreTesto,
            bold:""});
        else
          this.caselle.push({
            mostra:false,
            testo:"-",
            color:this.settings.coloreTesto,
            bold:""});
      }
    }
  }

  click(id:number, event:PointerEvent) {
    console.log(this.settings.coloreTesto)
    if (!this.enable) return;
    
    if (event.button == 1) {
      this.caselle[id].testo = "-";
    } else {
      if (this.valore != "") {
        this.caselle[id].testo = this.valore;
      }
    }

    for (let i = 0; i < 144; i++) {
      this.caselle[i].color = "";
      this.caselle[i].bold = "";
    }    

    //controllo righe
    var nValidi = 0;
    for (let i = 0; i < (this.settings.livello + 2); i++) {
      var vals = [];
      for (let ii = i * 12; ii < (i * 12) + (this.settings.livello + 2); ii++) {
        var txt = this.caselle[ii].testo;
        if (txt == "-") continue;
        var accetta = true;
        vals.forEach(x => {
          if (x == txt) {
            accetta = false;
          };
        });
        if (accetta) {
          vals.push(txt);
        }
      }
      if (vals.length == (this.settings.livello + 2)) {
        nValidi++;
        for (let ii = i * 12; ii < (i * 12) + (this.settings.livello + 2); ii++) 
        this.caselle[ii].color = this.settings.darkMode ? "darkgreen" : "red";
      }
    }
    

    //controllo colonne
    for (let i = 0; i < (this.settings.livello + 2); i++) {
      var vals = [];
      var x = i;
      var pos = [];
      for (let ii = 0; ii < 12; ii++) {
        pos.push(x);
        var txt = this.caselle[x].testo;
        if (txt == "-") continue;
        var accetta = true;
        vals.forEach(x => {
          if (x == txt) {
            accetta = false;
          };
        });
        if (accetta) {
          vals.push(txt);
        }
        x += 12;
      }
      if (vals.length == (this.settings.livello + 2)) {
        nValidi++;
        for (let ii = 0; ii < pos.length; ii++) this.caselle[pos[ii]].bold = "bolder";
      }
    }

    if ((this.settings.livello + 2)*2 == nValidi) {
      this.enable = false;
      setTimeout(() => {
        this.enable = true;
        this.settings.aumentoLvl();
        if (this.settings.livello < 11) {
          this.mostraCaselle();
        } else {
          this.vinto();
        }
      }, 1000);
    }
  }

  mostraCaselle() {
    this.reset();

    for (let i = 0; i < 12; i++) {
      //bottoni
      if (i < (this.settings.livello + 2)) {
        this.valori[i].mostra = false;
      }

      //caselle
      for (let ii = i * 12; ii < (i + 1) * 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (i*12 + (this.settings.livello + 2))) {
          this.caselle[ii].mostra = true;
        }
      }
    }
  }

  reset() {
    this.valore = "";
    for (let i = 0; i < 144; i++) {
      this.caselle[i].testo = "-";
      this.caselle[i].color = "";
      this.caselle[i].bold = "";
    }
  }

  vinto() {

  }

  keyup(event:KeyboardEvent) {
    if (this.valore != "") {
      var n = parseInt(this.valore);
      if (event.key == "ArrowRight" && n < this.settings.livello + 2) n += 1
      if (event.key == "ArrowLeft" && n >1) n -= 1
      this.valore = n.toString();
    }
  }
}