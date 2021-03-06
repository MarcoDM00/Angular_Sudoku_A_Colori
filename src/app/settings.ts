import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class Settings {
    menu:boolean = false;
    single:boolean = true;
    multi:boolean = true;
    impo:boolean = true;
    colore:string = "";
    darkMode:boolean = false;
    numeri:boolean = false;
    changeNumeri:boolean = false;
    precedente:string = "menu";
    valori:string[] = "A-B-C-D-E-F-G-H-I-J-K-L".split("-");
    livello:number = 1;
    css:string = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";
    colCss:string = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";

    constructor() {}

    cambio() {
        if (this.numeri) {
            this.valori = "1-2-3-4-5-6-7-8-9-10-11-12".split("-");
        } else {
            this.valori = "A-B-C-D-E-F-G-H-I-J-K-L".split("-");
        }
        this.changeNumeri = true;
    }

    aumentoLvl() {
        this.livello++;
    }

    changeCss() {
        this.css = "repeat(" + (this.livello + 2) + ", " + (12 - this.livello) + "fr)";
    }
}