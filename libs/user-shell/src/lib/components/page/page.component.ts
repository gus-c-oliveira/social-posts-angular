import { Component } from '@angular/core';
import { TranslatedPageComponent } from '@gus/language';

export const pageSelector = 'gus-user-page';

@Component({
  selector: pageSelector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class UserPageComponent extends TranslatedPageComponent {}
