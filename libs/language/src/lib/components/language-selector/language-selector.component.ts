import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SetCurrentLanguage } from '../../store';

export const languageComponentSelector = 'gus-language-selector';

@Component({
  selector: languageComponentSelector,
  templateUrl: './language-selector.component.html',
  styleUrls: ['./language-selector.component.scss'],
})
export class LanguageSelectorComponent implements OnDestroy {
  public flagImage = null;
  private currentLanguage = null;

  public constructor(
    private store$: Store<any>,
    private translateService: TranslateService
  ) {
    this.setupListenerForLanguageChange();
  }

  private setupListenerForLanguageChange() {
    this.translateService.onDefaultLangChange
      .pipe(untilDestroyed(this))
      .subscribe((event: LangChangeEvent) => {
        this.store$.dispatch(new SetCurrentLanguage(event.lang));
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
    const newLanguage = this.currentLanguage === 'en-US' ? 'pt-BR' : 'en-US';
    this.translateService.setDefaultLang(newLanguage);
    this.store$.dispatch(new SetCurrentLanguage(newLanguage));
  }

  public ngOnDestroy() {}
}
