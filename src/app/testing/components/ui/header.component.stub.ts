import { Component, EventEmitter, Input, Output } from '@angular/core';

export const headerSelector = 'app-header';

@Component({
  selector: headerSelector,
  template: 'Header Stub',
})
export class HeaderStubComponent {
  @Input() public title: any = '';
  @Input() public buttonText: any = '';
  @Output() public buttonClick = new EventEmitter<void>();

  public emitButtonClick() {}
}
