import { Component } from '@angular/core';
import { TranslatedPageComponent } from '@gus/language';

export const selector = 'gus-stats-page';

@Component({
  selector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class StatsPageComponent extends TranslatedPageComponent {}
