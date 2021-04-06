import { Component, OnDestroy } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

import { languageQuery } from '../store/index';

@UntilDestroy()
@Component({
  selector: 'gus-translated-page',
  template: '',
})
export class TranslatedPageComponent implements OnDestroy {
  public constructor(
    private store$: Store<any>,
    private translateService: TranslateService
  ) {
    this.addTranslations();
    this.setupDefaultLanguage();
    this.listenToLanguageChanges();
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

  private listenToLanguageChanges() {
    this.store$
      .pipe(untilDestroyed(this), select(languageQuery.getCurrentLanguage))
      .subscribe((lang) => this.translateService.use(lang));
  }

  public ngOnDestroy() {}
}
