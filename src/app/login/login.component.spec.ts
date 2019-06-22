import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Routes, RouterModule, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';

import { LoginComponent } from './login.component';

import { UserManagementService } from '../user-management.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    children: []
  },
  {
    path: 'loungeroom',
    children: []
  },
  {
    path: 'gameroom',
    children: []
  }
];

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userManagementService: UserManagementService;
  let router: Router;
  let navigateSpy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, RouterTestingModule.withRoutes(routes) ],
      declarations: [ LoginComponent ],
      providers: [ UserManagementService ]
    })
    .compileComponents();
    userManagementService = TestBed.get(UserManagementService);
    router = TestBed.get(Router);
    router.initialNavigation();
    router.navigate(['/login']);
    navigateSpy = spyOn(router, 'navigate');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not navigate with blank', () => {
    component.currentUsername =  "";
    component.loginClick();
    expect(navigateSpy).not.toHaveBeenCalled();
  });

  // JJV DEBUG - this might have to be expanded to include the server-side check ????
  it('should navigate to lounge with valid username', () => {
    component.currentUsername =  "TEST NAME";
    component.loginClick();
    expect(navigateSpy).toHaveBeenCalledWith(['/loungeroom']);
  });

});
