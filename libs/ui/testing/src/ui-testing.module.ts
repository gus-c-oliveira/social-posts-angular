import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonStubComponent } from './button.component.stub';
import { SpinnerStubComponent } from './spinner.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [ButtonStubComponent, SpinnerStubComponent],
  exports: [ButtonStubComponent, SpinnerStubComponent],
})
export class UiTestingModule {}
