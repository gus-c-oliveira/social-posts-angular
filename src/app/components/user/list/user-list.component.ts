import { Component } from '@angular/core';

export const userListSelector = 'app-user-list';

@Component({
  selector: userListSelector,
  template: `<p>{{ getName() }}</p>`,
})
export class UserListComponent {
  public getName() {
    return 'UserListComponent';
  }
}
