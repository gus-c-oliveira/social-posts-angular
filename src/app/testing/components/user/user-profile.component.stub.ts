import { Component, OnDestroy } from '@angular/core';

export const userProfileSelector = 'app-user-profile';

@Component({
  selector: userProfileSelector,
  template: 'User Profile Stub',
})
export class UserProfileStubComponent implements OnDestroy {
  public user$: any;
  public posts$: any;
  public loading$: any;
  public error$: any;
  public overlayRef: any;

  public handlePostSelection(id: any) {}

  public retryLoadingPosts() {}

  public ngOnDestroy() {}
}
