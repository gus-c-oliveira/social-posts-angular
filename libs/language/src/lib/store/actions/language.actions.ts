import { Action } from '@ngrx/store';

export enum LanguageActionTypes {
  SetCurrentLanguage = '[Language] Set Current Language',
}

export class SetCurrentLanguage implements Action {
  public readonly type = LanguageActionTypes.SetCurrentLanguage;

  public constructor(public language: string) {}
}

export type LanguageAction = SetCurrentLanguage;
