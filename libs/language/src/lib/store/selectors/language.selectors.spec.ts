import { languageQuery } from '../selectors/index';
import {
  initialLanguageState,
  LANGUAGE_STATE_KEY,
  LanguageState,
} from '../state/index';

describe('language Selectors', () => {
  let store: { [LANGUAGE_STATE_KEY]: LanguageState };

  beforeEach(() => {
    store = { [LANGUAGE_STATE_KEY]: initialLanguageState };
  });

  it(`"getCurrentLanguage" should return the current language`, () => {
    const selected = languageQuery.getCurrentLanguage(store);
    expect(selected).toEqual(store[LANGUAGE_STATE_KEY].currentLanguage);
  });
});
