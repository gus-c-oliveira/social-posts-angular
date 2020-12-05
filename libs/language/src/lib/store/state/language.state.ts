export const LANGUAGE_STATE_KEY = 'language';

export interface LanguageState {
  currentLanguage: string;
}

export const initialLanguageState: LanguageState = {
  currentLanguage: 'en-US',
};
