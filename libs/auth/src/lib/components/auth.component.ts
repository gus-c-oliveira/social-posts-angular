import { Component, HostBinding } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/index';

export const selector = 'gus-auth';

@Component({
  selector,
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  @HostBinding('attr.data-test') readonly dataTest = selector;

  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public login() {
    this.authService.login();
    this.router.navigate(['user']);
  }
}
