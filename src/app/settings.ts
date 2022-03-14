import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class Settings {
    menu:boolean = false;
    single:boolean = true;
    multi:boolean = true;
    impo:boolean = true;
    colore:string = "transparent";
    darkMode:boolean = true;
    numeri:boolean = false;
    precedente:string = "menu";
    valori:string[] = [];
    livello:number = 10;
    css:string = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";
    colCss:string = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";

    constructor() {}

    cambio() {
        if (this.numeri) {
            this.valori = "1-2-3-4-5-6-7-8-9-10".split("-");
        } else {
            this.valori = "A-B-C-D-E-F-G-H-I-J".split("-");
        }
    }

    aumentoLvl() {
        this.livello++;
        this.css = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";
    }
}