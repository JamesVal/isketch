import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GameRoomComponent } from './game-room.component';

const routes: Routes = [
  {
    path: '',
    component: GameRoomComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GameRoomRoutingModule { }
