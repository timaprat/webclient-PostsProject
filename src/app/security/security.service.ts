
import { AppUserAuth } from './app-user-auth';
import { LOGIN_MOCKS } from './login-mocks';
import { Injectable } from '@angular/core';
import { AppUser } from '../models/app-user.model';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  securityObject: AppUserAuth = new AppUserAuth();

  constructor(private router: Router) {}
  resetSecurityObject(): void {
    this.securityObject.userName = '';
    this.securityObject.bearerToken = '';
    this.securityObject.isAuthenticated = false;
    localStorage.removeItem('bearerToken');
  }

  login(userwaitingToLog: AppUser): Observable<AppUserAuth> {
    Object.assign(
      this.securityObject,
      LOGIN_MOCKS.find(
        (user) => user.userName.toLowerCase() === userwaitingToLog.userName.toLowerCase() && user.password === userwaitingToLog.password
      )
    );
    if (this.securityObject.userName !== '') {
      localStorage.setItem('bearerToken', this.securityObject.bearerToken);
    }
    return of<AppUserAuth>(this.securityObject);
  }

  logout(): void {
    this.resetSecurityObject();
    this.router.navigate(['login']);
    
  }
}
