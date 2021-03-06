import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  PostService,
  SimpleUser,
  UserActions,
  userQuery,
} from '@gus/user-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { USER_PROFILE_PATH } from '../../routes/paths';

export const userListSelector = 'gus-user-list';

@UntilDestroy()
@Component({
  selector: userListSelector,
  templateUrl: 'user-list.component.html',
  styleUrls: ['user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-test') readonly dataTest = userListSelector;

  public userList$: Observable<SimpleUser[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;

  public constructor(
    private store$: Store<any>,
    private router: Router,
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  public ngOnInit() {
    this.clearPreviousUserData();
    this.initObservables();
    this.loadUserList();
  }

  private clearPreviousUserData() {
    this.store$.dispatch(UserActions.clearSelectedUserID());
    this.postService.clearPosts();
  }

  private initObservables() {
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
        this.store$.dispatch(UserActions.loadUsers());
      }
    });
  }

  public handleUserSelection(id: number) {
    this.setSelectedUser(id);
    this.navigateToUserProfile();
  }

  private setSelectedUser(id: number) {
    this.store$.dispatch(UserActions.setSelectedUserID({ id }));
  }

  private navigateToUserProfile() {
    this.router.navigate([USER_PROFILE_PATH], {
      relativeTo: this.route.parent,
    });
  }

  public retryLoadingUsers() {
    this.store$.dispatch(UserActions.loadUsers());
  }

  public ngOnDestroy() {}
}
