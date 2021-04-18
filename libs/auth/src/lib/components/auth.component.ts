import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/index';

@Component({
  selector: 'gus-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login() {
    this.authService.login();
    this.router.navigate(['user']);
  }
}
