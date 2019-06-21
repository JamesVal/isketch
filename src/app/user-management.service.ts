import { Injectable } from '@angular/core';

@Injectable()
export class UserManagementService {

  username: string = "";
  loggedIn: boolean = false;

  setUsername(username: string): void  {
    this.username = username;
    this.loggedIn = true;
  }

  getUsername(): string {
    return this.username;
  }

  constructor() { }
}
