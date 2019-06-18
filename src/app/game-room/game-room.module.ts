import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GameRoomRoutingModule } from './game-room-routing.module';

import { ColorPickerModule } from 'ngx-color-picker';

import { GuessMessagesService } from './guess-messages.service';

import { CanvasComponent } from './canvas/canvas.component';
import { MessageBoxComponent } from './message-box/message-box.component';
import { GameRoomComponent } from './game-room.component';

@NgModule({
  declarations: [
    CanvasComponent,
    MessageBoxComponent,
    GameRoomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GameRoomRoutingModule,
    ColorPickerModule,
  ],
  providers: [
    GuessMessagesService
  ]
})
export class GameRoomModule { }
