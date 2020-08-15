import { Component } from '@angular/core';

export const userPostSelector = 'app-user-post';
export const USER_POST_PATH = 'user-post';

@Component({
  selector: userPostSelector,
  template: `<p>{{ getName() }}</p>`,
})
export class UserPostComponent {
  public getName() {
    return 'UserPostComponent';
  }
}
