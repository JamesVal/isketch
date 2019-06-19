import { Injectable } from '@angular/core';

@Injectable()
export class UserManagementService {

  username: string = "";

  setUsername(username: string): void  {
    this.username = username;
  }

  getUsername(): string {
    return this.username;
  }

  constructor() { }
}
