import { LanguageAction, LanguageActionTypes } from '../actions';
import { initialLanguageState, LanguageState } from '../state';

export const languageReducer = (
  state: LanguageState = initialLanguageState,
  action: LanguageAction
): LanguageState => {
  switch (action.type) {
    case LanguageActionTypes.SetCurrentLanguage:
      return {
        ...state,
        currentLanguage: action.language,
      };
    default:
      return state;
  }
};
