import { SetCurrentLanguage } from '../actions/index';
import { initialLanguageState } from '../state/index';
import { languageReducer } from './language.reducer';

describe('LanguageReducer', () => {
  describe('SetCurrentLanguage', () => {
    it('should set currentLanguage to action language value', () => {
      const newLanguage = 'pt-BR';
      const newState = languageReducer(
        initialLanguageState,
        new SetCurrentLanguage(newLanguage)
      );
      expect(newState).toEqual({
        currentLanguage: newLanguage,
      });
    });
  });
});
