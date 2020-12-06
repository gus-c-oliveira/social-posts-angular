import { Inject } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

import { TRANSLATIONS_TOKEN } from './token';
import { Translations } from './translations.model';

export class LibTranslationLoader implements TranslateLoader {
  public constructor(
    @Inject(TRANSLATIONS_TOKEN) private translations: Translations
  ) {}

  public getTranslation(lang: string): Observable<any> {
    return from([this.translations[lang] || this.translations['en-US']]);
  }
}

export function LibTranslationLoaderFactory(translations: Translations) {
  return new LibTranslationLoader(translations);
}
