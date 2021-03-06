import { OverlayRef } from '@angular/cdk/overlay';
import {
  Component,
  HostBinding,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  Post,
  PostService,
  RequestData,
  User,
  UserActions,
  userQuery,
} from '@gus/user-store';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

export const userPostSelector = 'gus-user-post';

@UntilDestroy()
@Component({
  selector: userPostSelector,
  templateUrl: './user-post.component.html',
  styleUrls: ['./user-post.component.scss'],
})
export class UserPostComponent implements OnInit, OnDestroy {
  @HostBinding('attr.data-test') readonly dataTest = userPostSelector;

  @Input() public overlayRef: OverlayRef = null;

  public user$: Observable<User>;
  public post$: Observable<Post>;
  public comments$: Observable<RequestData>;

  private selectedPostID: number = null;

  public constructor(
    private store$: Store<any>,
    private postService: PostService
  ) {}

  public ngOnInit() {
    this.postService.clearComments();
    this.initObservables();
  }

  private initObservables() {
    this.user$ = this.store$.pipe(
      select(userQuery.getSelectedUser),
      untilDestroyed(this)
    );
    this.post$ = this.postService.selectedPost$.pipe(
      filter((post) => !!post),
      tap((post) => {
        this.loadComments(post.id);
      }),
      untilDestroyed(this)
    );
    this.comments$ = this.postService.comments$.pipe(untilDestroyed(this));
  }

  private loadComments(postId: number) {
    if (this.selectedPostID === postId) {
      return;
    }
    this.selectedPostID = postId;
    this.postService.loadPostComments(postId);
  }

  public closePost() {
    if (!this.overlayRef) {
      console.warn('Error! No overlay!');
      return;
    }
    this.overlayRef.dispose();
  }

  public retryLoadingComments() {
    this.postService.loadPostComments(this.selectedPostID);
  }

  public openFriendProfile(id: number) {
    this.store$.dispatch(UserActions.setSelectedUserID({ id }));
    window.scrollTo(0, 0);
    this.closePost();
  }

  public ngOnDestroy() {
    this.clear();
  }

  private clear() {
    this.postService.clearSelectedPost();
  }
}
