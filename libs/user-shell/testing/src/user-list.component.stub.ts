import { Component, OnDestroy } from '@angular/core';

export const userListSelector = 'app-user-list';

@Component({
  selector: userListSelector,
  template: 'User List Stub',
})
export class UserListStubComponent implements OnDestroy {
  public userList$: any;
  public loading$: any;
  public error$: any;

  public handleUserSelection(id: any) {}

  public retryLoadingUsers() {}

  public ngOnDestroy() {}
}
