import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { USER_LIST_PATH } from '@app/user';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';

import { APP_CONSTANTS } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  public title = APP_CONSTANTS.AppTitle;
  public buttonText = 'User List';

  public constructor(private router: Router, private route: ActivatedRoute) {
    this.setupScrollToTopOnNavigation();
  }

  private setupScrollToTopOnNavigation() {
    this.router.events
      .pipe(
        untilDestroyed(this),
        filter((event) => event instanceof NavigationEnd)
      )
      .subscribe((event) => {
        window.scrollTo(0, 0);
      });
  }

  public navigateToUserList() {
    this.router.navigate([USER_LIST_PATH], {
      relativeTo: this.route.parent,
    });
  }

  public ngOnDestroy() {}
}
