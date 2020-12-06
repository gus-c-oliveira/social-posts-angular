import { Directive, OnDestroy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { languageQuery } from '../store/index';

@Directive()
// tslint:disable-next-line: directive-class-suffix
export abstract class TranslatedPage implements OnDestroy {
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
