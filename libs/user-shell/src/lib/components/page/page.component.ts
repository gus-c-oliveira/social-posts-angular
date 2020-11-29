import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { USER_LIST_PATH } from '../list/index';

export const pageSelector = 'gus-user-page';

@Component({
  selector: pageSelector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class UserPageComponent {
  public title = 'HEADER.APP_TITLE';
  public buttonText = 'HEADER.BUTTON';

  public constructor(private router: Router, private route: ActivatedRoute) {}

  public navigateToUserList() {
    this.router.navigate([USER_LIST_PATH], {
      relativeTo: this.route.parent,
    });
  }
}
