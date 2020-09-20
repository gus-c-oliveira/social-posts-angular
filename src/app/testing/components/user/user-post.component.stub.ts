import { Component, Input, OnDestroy } from '@angular/core';

export const userPostSelector = 'app-user-post';

@Component({
  selector: userPostSelector,
  template: 'User Post Stub',
})
export class UserPostComponent implements OnDestroy {
  @Input() public overlayRef: any = null;

  public post$: any;
  public postImageURL: any = '';
  public comments$: any;
  public loading$: any;
  public error$: any;

  public closePost() {}

  public retryLoadingComments() {}

  public ngOnDestroy() {}
}
