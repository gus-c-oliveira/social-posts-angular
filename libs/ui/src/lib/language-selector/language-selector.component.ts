import { Component, OnDestroy } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';

export const languageComponentSelector = 'gus-language-selector';

@Component({
  selector: languageComponentSelector,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnDestroy {
  public flagImage = null;
  private currentLanguage = null;

  public constructor(private translateService: TranslateService) {
    this.setupListenerForLanguageChange();
  }

  private setupListenerForLanguageChange() {
    this.translateService.onDefaultLangChange
      .pipe(untilDestroyed(this))
      .subscribe((event: LangChangeEvent) => {
        this.currentLanguage = event.lang;
        this.setFlagImage();
      });
  }

  private setFlagImage() {
    if (this.currentLanguage === 'en-US') {
      this.flagImage = 'assets/img/flags/pt-BR.svg';
    } else {
      this.flagImage = 'assets/img/flags/en-US.svg';
    }
  }

  public toggleLanguage() {
    if (this.currentLanguage === 'en-US') {
      this.translateService.setDefaultLang('pt-BR');
    } else {
      this.translateService.setDefaultLang('en-US');
    }
  }

  public ngOnDestroy() {}
}
