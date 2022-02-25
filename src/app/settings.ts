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

    constructor() {}
}