import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { UserManagementService } from '../user-management.service';

// JJV DEBUG - Will need some kind of login verification to see if the username is already logged in

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  currentUsername: string = "";

  onKeyup(event): void {
    if (event.key == "Enter") {
      this.loginClick();
    }
  }

  loginClick(): void {
    if (this.currentUsername) {
      console.log("login");
      this.userManagementService.setUsername(this.currentUsername);
      this.router.navigate(['/loungeroom']);
    }
  }

  constructor(private router: Router, private userManagementService: UserManagementService) {

  }

  ngOnInit() {
  }

}
