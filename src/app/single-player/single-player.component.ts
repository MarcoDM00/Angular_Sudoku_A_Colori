import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.css']
})
export class SinglePlayerComponent {

  constructor(public settings:Settings) {}

}