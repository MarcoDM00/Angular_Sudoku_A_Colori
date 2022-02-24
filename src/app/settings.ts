import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class Settings {
    colore:string = "white";
    darkMode:boolean = false;

    constructor() {}
}