import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { SinglePlayerComponent } from './single-player/single-player.component';
import { MultiPlayerComponent } from './multi-player/multi-player.component';

@NgModule({
  declarations: [
    AppComponent,
    SinglePlayerComponent,
    MultiPlayerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
