import { Component, OnDestroy } from '@angular/core';
import { TranslatedPage } from '@gus/language';

export const selector = 'gus-stats-page';

@Component({
  selector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class StatsPageComponent extends TranslatedPage implements OnDestroy {}
