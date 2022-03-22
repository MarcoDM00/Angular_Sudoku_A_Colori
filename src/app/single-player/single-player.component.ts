import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent implements AfterContentChecked {
  caselle:{nascondi:boolean, testo:string, modificabile:boolean, underline:boolean, shadow:boolean}[] = [];
  valori:{nascondi:boolean, testo:string, disable:boolean}[] = [];
  valore:string = "";
  enable:boolean = true;
  caselleVisibili:number[] = [];
  keys:string = "";
  win:boolean = false;

  constructor(public settings:Settings) {
    for (let i = 0; i < 12; i++) {
      //bottoni
      this.valori.push({
        nascondi:true,
        testo:"" + this.settings.valori[i],
        disable:false
      });

      //caselle
      for (let ii = 0; ii < 12; ii++) {
        this.caselleVisibili.push(ii + (i * 12));
        this.caselle.push({
          nascondi:true,
          testo:"-",
          modificabile:true,
          underline:false,
          shadow:false});
      }
    }

    this.mostraCaselle(); 
  }

  click(id:number, event:PointerEvent) {
    if (!this.enable) return;
    if (!this.caselle[id].modificabile) return;

    if (event.button == 1) {
      this.caselle[id].testo = "-";
    } else {
      if (this.valore != "") {
        this.caselle[id].testo = this.valore;
      }
    }

    for (let i = 0; i < 144; i++) {
      this.caselle[i].underline = false;
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
        for (let ii = i * 12; ii < (i * 12) + (this.settings.livello + 2); ii++) this.caselle[ii].underline = true;
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
        if (this.settings.livello < 1) {
          this.enable = true;
          this.settings.aumentoLvl();
          this.mostraCaselle();
        } else {
          this.vinto();
        }
      }, 1000);
    }
  }

  mostraCaselle() {
    this.reset(true);

    this.caselleVisibili = [];
    for (let i = 0; i < 12; i++) {
      //bottoni
      if (i < (this.settings.livello + 2)) {
        this.valori[i].nascondi = false;
      }

      //caselle
      for (let ii = i * 12; ii < (i + 1) * 12; ii++) {
        if (i < (this.settings.livello + 2) && ii < (i*12 + (this.settings.livello + 2))) {
          this.caselle[ii].nascondi = false;
          this.caselleVisibili.push(ii);
        }
      }
    }

    //valori preimpostati
    for (let i = 0; i < (this.settings.livello + 1); i++) {
      var x;
      do {
        x = Math.floor(Math.random() * this.caselleVisibili.length); //da 0 a length - 1
      } while (this.caselle[this.caselleVisibili[x]].testo != "-");
      this.caselle[this.caselleVisibili[x]].testo = this.settings.valori[i];
      this.caselle[this.caselleVisibili[x]].modificabile = false;
    }

    this.settings.changeCss();
  }

  reset(tutto:boolean) {
    if (!this.enable) return;
    this.keys = "";
    this.valore = "";
    if (tutto) {
      for (let i = 0; i < 12; i++) {
        this.valori[i].nascondi = true;
      }
    }
    for (let i = 0; i < 144; i++) {
      if (!tutto && !this.caselle[i].modificabile) continue;
      if (tutto) {
        this.caselle[i].modificabile = true;
        this.caselle[i].nascondi = true;
      }
      this.caselle[i].testo = "-";
      this.caselle[i].underline = false;
      this.caselle[i].shadow = false;
    }
  }

  vinto() {
    this.win = true;
    this.enable = false;
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
    for (let i = 0; i < 144; i++) {
      if (this.caselle[i].testo != "-") {
        var txt = this.caselle[i].testo;
        if (this.settings.numeri) {
          this.caselle[i].testo = (txt.charCodeAt(0) - 64).toString();
        } else {
          this.caselle[i].testo = this.settings.valori[parseInt(txt) - 1];
        }
      }
    }
  }

  async tasti(event: KeyboardEvent) {
    if (event.key != "p") {this.keys += event.key} else {this.keys = ""}
    if (this.keys == "magia") {
      for (let i = 0; i < (this.settings.livello + 2); i++) {
        console.log(this.settings.valori[i]);
        for (let ii = i; ii < i; ii + 12 + (this.settings.livello + 3)) {
          
          //this.caselle[(i * 12) + ii].testo = this.settings.valori[i];
          await this.sleep(500);
        }
      }
      /*
        this.enable = false;
        setTimeout(() => {
          if (this.settings.livello < 10) {
            this.enable = true;
            this.settings.aumentoLvl();
            this.mostraCaselle();
          } else {
            this.vinto();
          }
        }, 1000);
      */
    }
  }

  sleep(ms:number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}