import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ClearSelectedUserID,
  LoadUsers,
  SetSelectedUserID,
  SimpleUser,
  userQuery,
} from '@gus/user-store';
import { ClearPosts } from '@gus/post-store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { USER_PROFILE_PATH } from '../profile';

export const userListSelector = 'app-user-list';
export const USER_LIST_PATH = 'user-list';

@Component({
  selector: userListSelector,
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnDestroy {
  public userList$: Observable<SimpleUser[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;

  public constructor(
    private store$: Store<any>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.clearPreviousUserData();
    this.initializeObservables();
    this.loadUserList();
  }

  private clearPreviousUserData() {
    this.store$.dispatch(new ClearSelectedUserID());
    this.store$.dispatch(new ClearPosts());
  }

  private initializeObservables() {
    this.loading$ = this.store$.pipe(
      select(userQuery.getLoading),
      untilDestroyed(this)
    );
    this.error$ = this.store$.pipe(
      select(userQuery.getError),
      untilDestroyed(this)
    );
    this.userList$ = this.store$.pipe(
      select(userQuery.getSimpleUsers),
      untilDestroyed(this)
    );
  }

  private loadUserList() {
    this.userList$.pipe(take(1)).subscribe((users) => {
      if (!users || !users.length) {
        this.store$.dispatch(new LoadUsers());
      }
    });
  }

  public handleUserSelection(id: number) {
    this.setSelectedUser(id);
    this.navigateToUserProfile();
  }

  private setSelectedUser(id: number) {
    this.store$.dispatch(new SetSelectedUserID(id));
  }

  private navigateToUserProfile() {
    this.router.navigate([USER_PROFILE_PATH], {
      relativeTo: this.route.parent,
    });
  }

  public retryLoadingUsers() {
    this.store$.dispatch(new LoadUsers());
  }

  public ngOnDestroy() {}
}
