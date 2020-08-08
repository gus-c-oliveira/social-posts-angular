import { Component } from '@angular/core';

export const userProfileSelector = 'app-user-profile';

@Component({
  selector: userProfileSelector,
  template: `<p>{{ getName() }}</p>`,
})
export class UserProfileComponent {
  public getName() {
    return 'UserProfileComponent';
  }
}
