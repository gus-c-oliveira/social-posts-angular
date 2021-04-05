import { Component, HostBinding, Input } from '@angular/core';

export const buttonSelector = 'gus-button';

@Component({
  selector: buttonSelector,
  template: 'Button Stub',
})
export class ButtonStubComponent {
  @HostBinding('attr.data-test') readonly dataTest = 'ui-button';
  @Input() public buttonText: any = '';
}
