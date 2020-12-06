import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  LanguageModule,
  LibTranslationLoaderFactory,
  TRANSLATIONS_TOKEN,
} from '@gus/language';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

import en from '../assets/i18n/en-US.json';
import pt from '../assets/i18n/pt-BR.json';
import { StatsPageComponent } from './components/index';
import { ROUTES } from './routes/index';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: LibTranslationLoaderFactory,
        deps: [TRANSLATIONS_TOKEN],
      },
      isolate: true,
    }),
    LanguageModule,
  ],
  declarations: [StatsPageComponent],
  exports: [StatsPageComponent],
  providers: [
    {
      provide: TRANSLATIONS_TOKEN,
      useValue: {
        'en-US': en,
        'pt-BR': pt,
      },
    },
  ],
})
export class StatsShellModule {}
