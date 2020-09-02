import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AppState,
  LoadPosts,
  Post,
  postQuery,
  SetSelectedPostID,
  User,
  userQuery,
} from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import { USER_POST_PATH } from '../post';

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
  private currentUserID: number = null;

  public constructor(
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {
    // Get selected user from store
    this.user$ = this.store.pipe(
      select(userQuery.getSelectedUser),
      filter((user) => !!user),
      // Dispatch action to load user posts
      tap((user) => {
        if (this.currentUserID === user.id) {
          return;
        }
        this.currentUserID = user.id;
        this.store.dispatch(new LoadPosts(user.id));
      }),
      untilDestroyed(this)
    );
    this.posts$ = this.store.pipe(
      select(postQuery.getPosts),
      untilDestroyed(this)
    );
  }

  public openPost(id: number) {
    // Set selected post ID
    this.store.dispatch(new SetSelectedPostID(id));
    // Navigate to Post Component
    this.router.navigate([USER_POST_PATH], {
      relativeTo: this.route.parent,
    });
  }

  public ngOnDestroy() {}
}
