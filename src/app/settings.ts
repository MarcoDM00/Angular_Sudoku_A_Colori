import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class Settings {
    menu:boolean = false;
    single:boolean = true;
    multi:boolean = true;
    impo:boolean = true;
    colore:string = "white";
    darkMode:boolean = false;
    numeri:boolean = false;
    precedente:string = "menu";
    valori:string[] = [];
    livello:number = 9;
    lvlCss:string = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";

    constructor() {}

    cambio():void {
        if (this.numeri) {
            this.valori = "1-2-3-4-5-6-7-8-9-10".split("-");
        } else {
            this.valori = "A-B-C-D-E-F-G-H-I-J".split("-");
        }
    }

    aumentoLvl() {
        this.livello++;
        this.lvlCss = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";
    }
}