import { Component, OnDestroy } from '@angular/core';
import {
  AppState,
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
    this.post$ = this.store.pipe(
      select(postQuery.getSelectedPost),
      filter((post) => !!post),
      tap((post) => {
        if (this.selectedPostID === post.id) {
          return;
        }
        this.selectedPostID = post.id;
        this.store.dispatch(new LoadComments(this.selectedPostID));
      }),
      untilDestroyed(this)
    );
    this.comments$ = this.store.pipe(
      select(commentQuery.getComments),
      untilDestroyed(this)
    );
  }

  public ngOnDestroy() {}
}
