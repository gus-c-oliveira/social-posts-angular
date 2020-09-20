import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonStubComponent } from './button.component.stub';
import { LanguageSelectorStubComponent } from './language-selector.component.stub';
import { SpinnerStubComponent } from './spinner.component.stub';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonStubComponent,
    LanguageSelectorStubComponent,
    SpinnerStubComponent,
  ],
  exports: [
    ButtonStubComponent,
    LanguageSelectorStubComponent,
    SpinnerStubComponent,
  ],
})
export class UiTestingModule {}
