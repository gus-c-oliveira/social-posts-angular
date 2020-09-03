import { Component, OnDestroy } from '@angular/core';
import {
  AppState,
  Comment,
  commentQuery,
  LoadComments,
  Post,
  postQuery,
  ClearComments,
  ClearSelectedPostID,
} from '@app/store';
import { select, Store } from '@ngrx/store';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const userPostSelector = 'app-user-post';
export const USER_POST_PATH = 'user-post';

@Component({
  selector: userPostSelector,
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnDestroy {
  public post$: Observable<Post>;
  public comments$: Observable<Comment[]>;
  private selectedPostID: number = null;

  public constructor(private store: Store<AppState>) {
    this.listenPostData();
  }

  private listenPostData() {
    this.post$ = this.store.pipe(
      select(postQuery.getSelectedPost),
      filter((post) => !!post),
      tap((post) => this.loadComments(post.id)),
      untilDestroyed(this)
    );
    this.comments$ = this.store.pipe(
      select(commentQuery.getComments),
      untilDestroyed(this)
    );
  }

  private loadComments(postId: number) {
    if (this.selectedPostID === postId) {
      return;
    }
    this.selectedPostID = postId;
    this.store.dispatch(new LoadComments(postId));
  }

  public ngOnDestroy() {
    this.clear();
  }

  private clear() {
    this.store.dispatch(new ClearSelectedPostID());
    this.store.dispatch(new ClearComments());
  }
}
