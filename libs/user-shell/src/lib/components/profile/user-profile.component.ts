import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { PostActions, Post, postQuery } from '@gus/post-store';
import { UserActions, User, userQuery } from '@gus/user-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

import { UserPostComponent } from '../post/index';

export const userProfileSelector = 'gus-user-profile';

@UntilDestroy()
@Component({
  selector: userProfileSelector,
  templateUrl: 'user-profile.component.html',
  styleUrls: ['user-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent implements OnDestroy {
  @HostBinding('attr.data-cy') readonly dataCy = userProfileSelector;

  public user$: Observable<User>;
  public posts$: Observable<Post[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  public overlayRef: OverlayRef;
  public userCoverImgSRC = '';
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
    this.store$.dispatch(PostActions.loadPosts({ id }));
  }

  private updateUserCover(id: number) {
    this.userCoverImgSRC = `url(https://picsum.photos/seed/${
      10 * id
    }/1500/300)`;
  }

  public handlePostSelection(id: number) {
    this.setSelectedPostID(id);
    this.openPostModal();
  }

  private setSelectedPostID(id: number) {
    this.store$.dispatch(PostActions.setSelectedPostID({ id }));
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
    this.overlayRef.backdropClick().subscribe(() => this.overlayRef.dispose());
    const portal = new ComponentPortal(UserPostComponent);
    const postComponent = this.overlayRef.attach<UserPostComponent>(portal)
      .instance;
    postComponent.overlayRef = this.overlayRef;
  }

  public retryLoadingPosts() {
    this.user$
      .pipe(take(1))
      .subscribe((user) =>
        this.store$.dispatch(PostActions.loadPosts({ id: user.id }))
      );
  }

  public updateUser(id: number) {
    this.store$.dispatch(UserActions.setSelectedUserID({ id }));
    window.scrollTo(0, 0);
  }

  public ngOnDestroy() {}
}
