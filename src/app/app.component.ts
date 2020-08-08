import { Component } from '@angular/core';

import { APP_CONSTANTS } from './app.constants';
import { APP_ROUTES } from '@app/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = APP_CONSTANTS.AppTitle;
  public links = [
    { path: APP_ROUTES[0].path, title: 'User List Component' },
    { path: APP_ROUTES[1].path, title: 'User Post Component' },
    { path: APP_ROUTES[2].path, title: 'User Profile Component' },
  ];
}
