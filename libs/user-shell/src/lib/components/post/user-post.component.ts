import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnDestroy } from '@angular/core';
import {
  ClearComments,
  Comment,
  commentQuery,
  LoadComments,
} from '@gus/comment-store';
import { PostActions, Post, postQuery } from '@gus/post-store';
import { User, userQuery } from '@gus/user-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take, tap } from 'rxjs/operators';

export const userPostSelector = 'gus-user-post';

@UntilDestroy()
@Component({
  selector: userPostSelector,
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnDestroy {
  @Input() public overlayRef: OverlayRef = null;

  public user$: Observable<User>;
  public post$: Observable<Post>;
  public comments$: Observable<Comment[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  private selectedPostID: number = null;

  public constructor(private store$: Store<any>) {
    this.initializeObservables();
  }

  private initializeObservables() {
    this.loading$ = this.store$.pipe(
      select(commentQuery.getLoading),
      untilDestroyed(this)
    );
    this.error$ = this.store$.pipe(
      select(commentQuery.getError),
      untilDestroyed(this)
    );
    this.user$ = this.store$.pipe(
      select(userQuery.getSelectedUser),
      untilDestroyed(this)
    );
    this.post$ = this.store$.pipe(
      select(postQuery.getSelectedPost),
      filter((post) => !!post),
      tap((post) => {
        this.loadComments(post.id);
      }),
      untilDestroyed(this)
    );
    this.comments$ = this.store$.pipe(
      select(commentQuery.getComments),
      untilDestroyed(this)
    );
  }

  private loadComments(postId: number) {
    if (this.selectedPostID === postId) {
      return;
    }
    this.selectedPostID = postId;
    this.store$.dispatch(new LoadComments(postId));
  }

  public closePost() {
    if (!this.overlayRef) {
      console.warn('Error! No overlay!');
      return;
    }
    this.overlayRef.dispose();
  }

  public retryLoadingComments() {
    this.post$
      .pipe(take(1))
      .subscribe((post) => this.store$.dispatch(new LoadComments(post.id)));
  }

  public ngOnDestroy() {
    this.clear();
  }

  private clear() {
    this.store$.dispatch(PostActions.clearSelectedPostID());
    this.store$.dispatch(new ClearComments());
  }
}
