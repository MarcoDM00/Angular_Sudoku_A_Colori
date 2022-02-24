import {Component, OnInit} from '@angular/core';
import {Settings} from "./settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  menu:boolean = false;
  single:boolean = true;
  multi:boolean = true;
  impo:boolean = true;
  colore:string = "white";
  darkMode:boolean = false;

  constructor(private settings:Settings) {}

  ngOnInit(): void {}
  
  aggiorna(n:number) {
    if (n == 0) {this.menu = true; this.single = false;}
    if (n == 1) {this.menu = true; this.multi = false;}
    if (n == 2) {this.menu = true; this.impo = false;}
    if (n == 3) {this.menu = false; this.impo = true;}

    this.settings.colore = this.colore;
    this.settings.darkMode = this.darkMode;
  }
}
