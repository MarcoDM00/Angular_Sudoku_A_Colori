import { Component, OnInit, AfterContentChecked, AfterContentInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements AfterContentChecked {
  caselle:{nascondi:boolean, testo:string, color:boolean, shadow:boolean}[] = [];
  valori:{nascondi:boolean, testo:string, disable:boolean}[] = [];
  valore:string = "";
  enable:boolean = true;

  constructor(public settings:Settings) {
    for (let i = 0; i < 12; i++) {
      //bottoni
      this.valori.push({
        nascondi:i < (this.settings.livello + 2) ? false : true,
        testo:"" + this.settings.valori[i],
        disable:false});

      //caselle
      for (let ii = 0; ii < 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (this.settings.livello + 2))
          this.caselle.push({
            nascondi:true,
            testo:"-",
            color:false,
            shadow:false});
        else
          this.caselle.push({
            nascondi:false,
            testo:"-",
            color:false,
            shadow:false});
      }
    }
  }

  click(id:number, event:PointerEvent) {
    if (!this.enable) return;
    if (event.button == 1) {
      this.caselle[id].testo = "-";
    } else {
      if (this.valore != "") {
        this.caselle[id].testo = this.valore;
      }
    }

    for (let i = 0; i < 144; i++) {
      this.caselle[i].color = false;
      this.caselle[i].shadow = false;
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
        for (let ii = i * 12; ii < (i * 12) + (this.settings.livello + 2); ii++) this.caselle[ii].color = true;
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
        for (let ii = 0; ii < pos.length; ii++) this.caselle[pos[ii]].shadow = true;
      }
    }

    if ((this.settings.livello + 2)*2 == nValidi) {
      this.enable = false;
      setTimeout(() => {
        if (this.settings.livello < 10) {
          this.enable = true;
          this.settings.aumentoLvl();
          this.nascondiCaselle();
        } else {
          this.vinto();
        }
      }, 1000);
    }
  }

  nascondiCaselle() {
    this.reset();

    for (let i = 0; i < 12; i++) {
      //bottoni
      if (i < (this.settings.livello + 2)) {
        this.valori[i].nascondi = false;
      }

      //caselle
      for (let ii = i * 12; ii < (i + 1) * 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (i*12 + (this.settings.livello + 2))) {
          this.caselle[ii].nascondi = true;
        }
      }
    }
  }

  reset() {
    this.valore = "";
    for (let i = 0; i < 144; i++) {
      this.caselle[i].testo = "-";
      this.caselle[i].color = false;
      this.caselle[i].shadow = false;
    }
  }

  vinto() {
    alert("Vinto");
  }

  keyup(event:KeyboardEvent) {
    if (this.valore != "") {
      var n = parseInt(this.valore);
      if (event.key == "ArrowRight" && n < this.settings.livello + 2) n += 1
      if (event.key == "ArrowLeft" && n >1) n -= 1
      this.valore = n.toString();
    }
  }

  ngAfterContentChecked() {
    if (!this.settings.changeNumeri) return;
    this.settings.changeNumeri = false;

    //bottoni
    for (let i = 0; i < 12; i++) {
      this.valori[i].testo = this.settings.valori[i];
    }

    //caselle
    if (this.settings.numeri) {
      for (let i = 0; i < 144; i++) {
        var txt = this.caselle[i].testo;
        if (txt != "-") {
          this.caselle[i].testo = (txt.charCodeAt(0) - 64).toString();
        }
      }
    } else {
      for (let i = 0; i < 144; i++) {
        var txt = this.caselle[i].testo;
        if (txt != "-") {
          this.caselle[i].testo = this.settings.valori[parseInt(txt) - 1];
        }
      }
    }
  }
}