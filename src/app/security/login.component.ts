import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppUser } from '../models/app-user.model';
import { AppUserAuth } from './app-user-auth';
import { SecurityService } from './security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.securityService.logout();
  }
  login() {
    this.securityService.login(this.user).subscribe((resp) => {
      this.securityObject = resp;
      if (this.securityObject.isAuthenticated) {
        this.router.navigate(['/posts/list']);
      }
    });
  }
}
