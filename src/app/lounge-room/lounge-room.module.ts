import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoungeRoomComponent } from './lounge-room.component';
import { RoomPickerComponent } from './room-picker/room-picker.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [RoomPickerComponent, LoungeRoomComponent]
})
export class LoungeRoomModule { }
