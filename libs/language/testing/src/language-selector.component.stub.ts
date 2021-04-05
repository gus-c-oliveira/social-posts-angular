import { Component, HostBinding, OnDestroy } from '@angular/core';

export const selector = 'gus-language-selector';

@Component({
  selector,
  template: 'Language Selector Stub',
})
export class LanguageSelectorStubComponent implements OnDestroy {
  @HostBinding('attr.data-test') readonly dataTest = selector;
  public flagImage: any = null;

  public toggleLanguage() {}

  public ngOnDestroy() {}
}
