import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoungeRoomComponent } from './lounge-room.component';
import { RoomPickerComponent } from './room-picker/room-picker.component';

const routes: Routes = [
  {
    path: '',
    component: LoungeRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoungeRoomRoutingModule { }
