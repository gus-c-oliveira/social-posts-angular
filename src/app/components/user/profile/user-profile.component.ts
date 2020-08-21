import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  AppState,
  User,
  userQuery,
  LoadPosts,
  Post,
  postQuery,
} from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

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
  public posts$: Observable<Post[]>;

  public constructor(private store: Store<AppState>) {
    // Get selected user from store
    this.user$ = this.store.pipe(
      select(userQuery.getSelectedUser),
      filter((user) => !!user),
      // Dispatch action to load user posts
      tap((user) => this.store.dispatch(new LoadPosts(user.id))),
      untilDestroyed(this)
    );
    this.posts$ = this.store.pipe(
      select(postQuery.getPosts),
      untilDestroyed(this)
    );
  }

  public ngOnDestroy() {}
}
