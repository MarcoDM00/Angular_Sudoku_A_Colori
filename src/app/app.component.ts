import {Component, OnInit} from '@angular/core';
import {Settings} from "./settings";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public settings:Settings) {}

  ngOnInit(): void {}
  
  aggiorna(n:number) {
    if (n == 0) {this.settings.menu = true; this.settings.single = false;}
    if (n == 1) {this.settings.menu = true; this.settings.multi = false;}
    if (n == 2) {this.settings.menu = true; this.settings.impo = false;}
    if (n == 3) {this.settings.menu = false; this.settings.impo = true;}  }
}
