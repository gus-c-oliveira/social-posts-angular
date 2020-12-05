import { Component, OnDestroy } from '@angular/core';
import { languageQuery } from '@gus/language';
import { select, Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

export const selector = 'gus-stats-page';

@Component({
  selector,
  templateUrl: './stats-page.component.html',
  styleUrls: ['./stats-page.component.scss'],
})
export class StatsPageComponent implements OnDestroy {
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