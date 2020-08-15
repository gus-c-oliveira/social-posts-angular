import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { AppState, User, userQuery } from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';

export const userProfileSelector = 'app-user-profile';
export const USER_PROFILE_PATH = 'user-profile';

@Component({
  selector: userProfileSelector,
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnDestroy {
  public user$: Observable<User>;
  public labels: string[];

  public constructor(private store: Store<AppState>) {
    this.user$ = this.store.pipe(
      select(userQuery.getSelectedUser),
      untilDestroyed(this)
    );
  }

  public ngOnDestroy() {}
}
