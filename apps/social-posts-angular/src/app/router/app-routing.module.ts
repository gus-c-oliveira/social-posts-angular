import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_ROUTES } from './app.routes';

export const AppBaseHref = { provide: APP_BASE_HREF, useValue: '/' };

@NgModule({
  imports: [RouterModule.forRoot(APP_ROUTES)],
  providers: [AppBaseHref],
  exports: [RouterModule],
})
export class AppRoutingModule {}
