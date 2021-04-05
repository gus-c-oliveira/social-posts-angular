import { Component, HostBinding } from '@angular/core';

export const spinnerSelector = 'gus-spinner';

@Component({
  selector: spinnerSelector,
  template: 'Spinner Stub',
})
export class SpinnerStubComponent {
  @HostBinding('attr.data-test') readonly dataTest = 'loader';
}
