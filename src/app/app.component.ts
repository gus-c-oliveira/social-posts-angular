import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST_PATH } from '@app/user';

import { APP_CONSTANTS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = APP_CONSTANTS.AppTitle;
  public buttonText = 'User List';

  public constructor(private router: Router, private route: ActivatedRoute) {}

  public navigateToUserList() {
    this.router.navigate([USER_LIST_PATH], {
      relativeTo: this.route.parent,
    });
  }
}
