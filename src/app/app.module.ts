import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './auth/auth.guard';
import { UserManagementService } from './user-management.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    UserManagementService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
