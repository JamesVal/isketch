import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoungeRoomRoutingModule } from './lounge-room-routing.module';

import { LoungeRoomComponent } from './lounge-room.component';
import { RoomPickerComponent } from './room-picker/room-picker.component';

@NgModule({
  imports: [
    CommonModule,
    LoungeRoomRoutingModule
  ],
  declarations: [RoomPickerComponent, LoungeRoomComponent]
})
export class LoungeRoomModule { }
