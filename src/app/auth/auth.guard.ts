import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { UserManagementService } from '../user-management.service';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.userManagementService.loggedIn) return true;

    this.router.navigate(['/login']);
    return false;
  }

  constructor(private router: Router, private userManagementService: UserManagementService) {}
}
