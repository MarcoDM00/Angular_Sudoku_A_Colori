import { Component, OnInit } from '@angular/core';
import { Settings } from '../settings';

@Component({
  selector: 'app-multi-player',
  templateUrl: './multi-player.component.html',
  styleUrls: ['./multi-player.component.css']
})
export class MultiPlayerComponent implements OnInit {

  constructor(public settings:Settings) {}

  ngOnInit(): void {

  }

}
