import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-casella',
  templateUrl: './casella.component.html',
  styleUrls: ['./casella.component.css']
})
export class CasellaComponent implements OnInit {
  @Input() mostra:boolean
  testo:string = "ciao";

  constructor() { }

  ngOnInit(): void {}

}
