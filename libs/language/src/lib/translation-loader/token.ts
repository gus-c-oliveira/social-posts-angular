import { InjectionToken } from '@angular/core';

import { Translations } from './translations.model';

export const TRANSLATIONS_TOKEN = new InjectionToken<Translations>(
  'Object containing translations'
);
