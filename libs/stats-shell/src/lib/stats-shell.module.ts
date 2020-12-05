import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageModule } from '@gus/language';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import en from '../assets/i18n/en-US.json';
import pt from '../assets/i18n/pt-BR.json';
import { StatsPageComponent } from './components/index';
import { ROUTES } from './routes/index';
import { from, Observable } from 'rxjs';

class LibTranslationLoader implements TranslateLoader {
  private locales = {
    'en-US': en,
    'pt-BR': pt,
  };

  public getTranslation(lang: string): Observable<any> {
    return from([this.locales[lang] || this.locales['en-US']]);
  }
}

function LibTranslationLoaderFactory() {
  return new LibTranslationLoader();
}

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LibTranslationLoaderFactory,
      },
      isolate: true,
    }),
    LanguageModule,
  ],
  declarations: [StatsPageComponent],
  exports: [StatsPageComponent],
})
export class StatsShellModule {}
