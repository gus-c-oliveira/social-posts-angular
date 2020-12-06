import { Inject, InjectionToken } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';

export interface Translations {
  'en-US': any;
  'pt-BR': any;
}

export const TRANSLATIONS_TOKEN = new InjectionToken<Translations>(
  'Object containing translations'
);

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
