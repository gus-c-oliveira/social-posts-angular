import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const pageSelector = 'gus-user-page';

@Component({
  selector: pageSelector,
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
})
export class UserPageComponent {
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
