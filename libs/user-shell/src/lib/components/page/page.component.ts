import { Component, OnDestroy } from '@angular/core';
import { TranslatedPage } from '@gus/language';

export const pageSelector = 'gus-user-page';

@Component({
  selector: pageSelector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class UserPageComponent extends TranslatedPage implements OnDestroy {}
