import { Component, OnInit } from '@angular/core';
import { CasellaComponent } from '../casella/casella.component';

@Component({
  selector: 'app-riga',
  templateUrl: './riga.component.html',
  styleUrls: ['./riga.component.css']
})
export class RigaComponent implements OnInit {
  caselle:boolean[] = [
    false, false, true, true, true, true, true, true, true, true, true, true
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
