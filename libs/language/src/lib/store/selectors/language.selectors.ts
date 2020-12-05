import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LanguageState, LANGUAGE_STATE_KEY } from '../state/index';

const getLanguageState = createFeatureSelector<LanguageState>(
  LANGUAGE_STATE_KEY
);

const getCurrentLanguage = createSelector(
  getLanguageState,
  (state: LanguageState): string => state.currentLanguage
);

export const languageQuery = {
  getCurrentLanguage,
};
