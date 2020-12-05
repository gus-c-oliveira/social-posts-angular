import { Routes } from '@angular/router';

export const USER_AREA_PATH = 'user';
export const STATS_AREA_PATH = 'stats';

export const APP_ROUTES: Routes = [
  { path: USER_AREA_PATH, loadChildren: '@gus/user-shell#UserShellModule' },
  { path: STATS_AREA_PATH, loadChildren: '@gus/stats-shell#StatsShellModule' },
  { path: '**', redirectTo: USER_AREA_PATH },
];
