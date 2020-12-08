import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { userQuery } from '@gus/user-store';
import { select, Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';

@Injectable()
export class ProfileGuardService implements CanActivate {
  public constructor(private store$: Store<any>, private router: Router) {}

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    return this.store$.pipe(
      take(1),
      select(userQuery.getSelectedUserID),
      map((id) => {
        if (id || id === 0) {
          return true;
        }
        this.router.navigate(['/']);
        return false;
      })
    );
  }
}
