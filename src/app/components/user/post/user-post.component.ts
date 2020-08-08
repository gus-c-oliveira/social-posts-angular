import { Component } from '@angular/core';

export const userPostSelector = 'app-user-post';

@Component({
  selector: userPostSelector,
  template: `<p>{{ getName() }}</p>`,
})
export class UserPostComponent {
  public getName() {
    return 'UserPostComponent';
  }
}
