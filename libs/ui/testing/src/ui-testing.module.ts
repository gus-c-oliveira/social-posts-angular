import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonStubComponent } from './button.component.stub';
import { SpinnerStubComponent } from './spinner.component.stub';
import { TooltipStubDirective } from './tooltip.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonStubComponent,
    SpinnerStubComponent,
    TooltipStubDirective,
  ],
  exports: [ButtonStubComponent, SpinnerStubComponent, TooltipStubDirective],
})
export class UiTestingModule {}
