import { OverlayRef } from '@angular/cdk/overlay';
import { Component, Input, OnDestroy } from '@angular/core';
import {
  AppState,
  ClearComments,
  ClearSelectedPostID,
  Comment,
  commentQuery,
  LoadComments,
  Post,
  postQuery,
} from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const userPostSelector = 'app-user-post';

@Component({
  selector: userPostSelector,
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnDestroy {
  @Input() public overlayRef: OverlayRef = null;

  public post$: Observable<Post>;
  public comments$: Observable<Comment[]>;
  public loading$: Observable<boolean>;
  public error$: Observable<boolean>;
  private selectedPostID: number = null;

  public constructor(private store$: Store<AppState>) {
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
    this.post$ = this.store$.pipe(
      select(postQuery.getSelectedPost),
      filter((post) => !!post),
      tap((post) => this.loadComments(post.id)),
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

  public ngOnDestroy() {
    this.clear();
  }

  private clear() {
    this.store$.dispatch(new ClearSelectedPostID());
    this.store$.dispatch(new ClearComments());
  }
}
