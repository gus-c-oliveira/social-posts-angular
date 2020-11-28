import { Component, OnDestroy } from '@angular/core';

export const selector = 'gus-language-selector';

@Component({
  selector,
  template: 'Language Selector Stub',
})
export class LanguageSelectorStubComponent implements OnDestroy {
  public flagImage: any = null;

  public toggleLanguage() {}

  public ngOnDestroy() {}
}