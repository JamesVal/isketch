import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ColorPickerModule } from 'ngx-color-picker';

import { GuessMessagesService } from './guess-messages.service';

import { AppComponent } from './app.component';
import { CanvasComponent } from './canvas/canvas.component';
import { MessageBoxComponent } from './message-box/message-box.component';

@NgModule({
  declarations: [
    AppComponent,
    CanvasComponent,
    MessageBoxComponent
  ],
  imports: [
    BrowserModule,
    ColorPickerModule
  ],
  providers: [GuessMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
