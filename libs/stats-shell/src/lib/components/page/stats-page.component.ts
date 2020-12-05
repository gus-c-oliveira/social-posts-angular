import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const selector = 'gus-stats-page';

@Component({
  selector,
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent {
  public constructor(private translateService: TranslateService) {
    this.addTranslations();
    this.setupDefaultLanguage();
  }

  private addTranslations() {
    this.translateService.addLangs(['en-US', 'pt-BR']);
  }

  private setupDefaultLanguage() {
    const browserLanguage = navigator.language;
    if (this.translateService.langs.indexOf(browserLanguage) !== -1) {
      this.translateService.setDefaultLang(browserLanguage);
    } else {
      this.translateService.setDefaultLang('en-US');
    }
  }
}
