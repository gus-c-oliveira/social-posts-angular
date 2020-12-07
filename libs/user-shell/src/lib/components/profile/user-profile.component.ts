import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { LoadPosts, Post, postQuery, SetSelectedPostID } from '@gus/post-store';
import { SetSelectedUserID, User, userQuery } from '@gus/user-store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { UserPostComponent } from '../post';

export const userProfileSelector = 'gus-user-profile';

@Component({
  selector: userProfileSelector,
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnDestroy {
  public user$: Observable<User>;
  public posts$: Observable<Post[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  public overlayRef: OverlayRef;
  public userCoverImgSRC = '';
  public userFriends = [];
  private currentUserID: number = null;

  public constructor(private store$: Store<any>, private overlay: Overlay) {
    this.initializeObservables();
  }

  private initializeObservables() {
    this.loading$ = this.store$.pipe(
      select(postQuery.getLoading),
      untilDestroyed(this)
    );
    this.error$ = this.store$.pipe(
      select(postQuery.getError),
      untilDestroyed(this)
    );
    this.user$ = this.store$.pipe(
      select(userQuery.getSelectedUser),
      filter((user) => !!user),
      tap((user) => {
        this.loadPosts(user.id);
        this.updateUserCover(user.id);
        this.updateUserFriendsArray(user.friendIDs);
      }),
      untilDestroyed(this)
    );
    this.posts$ = this.store$.pipe(
      select(postQuery.getPosts),
      untilDestroyed(this)
    );
  }

  private loadPosts(id: number) {
    if (this.currentUserID === id) {
      return;
    }
    this.currentUserID = id;
    this.store$.dispatch(new LoadPosts(id));
  }

  private updateUserCover(id: number) {
    this.userCoverImgSRC = `url(https://picsum.photos/seed/${
      10 * id
    }/1500/300)`;
  }

  private updateUserFriendsArray(friendIDs: number[]) {
    this.userFriends = [];
    friendIDs.forEach((ID) => {
      this.store$
        .pipe(take(1), select(userQuery.getUserByID(ID)))
        .subscribe((user) =>
          this.userFriends.push({
            ID,
            username: user.username,
            pictureURL: user.pictureURL,
          })
        );
    });
  }

  public handlePostSelection(id: number) {
    this.setSelectedPostID(id);
    this.openPostModal();
  }

  private setSelectedPostID(id: number) {
    this.store$.dispatch(new SetSelectedPostID(id));
  }

  private openPostModal() {
    const positionStrategy = this.overlay
      .position()
      .global()
      .centerHorizontally()
      .centerVertically();
    this.overlayRef = this.overlay.create({
      width: '80%',
      hasBackdrop: true,
      disposeOnNavigation: true,
      backdropClass: ['post-overlay', 'cdk-overlay-dark-backdrop'],
      positionStrategy,
    });
    this.overlayRef.backdropClick().subscribe((_) => this.overlayRef.dispose());
    const portal = new ComponentPortal(UserPostComponent);
    const postComponent = this.overlayRef.attach<UserPostComponent>(portal)
      .instance;
    postComponent.overlayRef = this.overlayRef;
  }

  public retryLoadingPosts() {
    this.user$
      .pipe(take(1))
      .subscribe((user) => this.store$.dispatch(new LoadPosts(user.id)));
  }

  public updateUser(ID: number) {
    this.store$.dispatch(new SetSelectedUserID(ID));
  }

  public ngOnDestroy() {}
}
