import { NgModule, Injectable } from '@angular/core';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';

// JJV DEBUG - will need to check the login - don't allow them to go to gameroom without actually logging in first

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'loungeroom',
    loadChildren: () => import('./lounge-room/lounge-room.module').then(m => m.LoungeRoomModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'gameroom',
    loadChildren: () => import('./game-room/game-room.module').then(m => m.GameRoomModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

