import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  public constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  public canActivate() {
    return this.authService.isLoggedIn$.pipe(
      take(1),
      tap((isLoggedIn) => {
        if (!isLoggedIn) {
          this.router.navigate(['auth']);
        }
      })
    );
  }
}
